const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    '/pages/fallback.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
    (async () => {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        if (keys.length > size) {
            await cache.delete(keys[0]);
            limitCacheSize(name, size);
        }
    })();
}

// install service worker
self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    evt.waitUntil(
        (async () => {
            const cache = await caches.open(staticCacheName);
            console.log('caching shell assets');
            await cache.addAll(assets);
        })()
    );
});

//activate service worker
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        (async () => {
            const keys = await caches.keys();
            // console.log(keys);
            return Promise.all(
                keys.filter(key => key !== staticCacheName && key !== dynamicCacheName)
                    .map(key => caches.delete(key))
            );
        })()
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        evt.respondWith(
            (async () => {

                try {

                    const cachedResponse = await caches.match(evt.request);

                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    const serverResponse = await fetch(evt.request);
                    const cache = await caches.open(dynamicCacheName);
                    await cache.put(evt.request.url, serverResponse.clone());
                    limitCacheSize(dynamicCacheName, 15);
                    return serverResponse;

                } catch {

                    if (evt.request.url.indexOf('.html') !== -1) {
                        return caches.match('/pages/fallback.html');
                    }
                    // optionally add check for image resources and other file types for different offline behavior
                }
            })());
    }
});