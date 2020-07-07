<?php

function console_log($output, $with_script_tags = true)
{
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';

    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

console_log($_SERVER['HTTP_X_FORWARDED_PROTO']);

if ($_SERVER['HTTP_X_FORWARDED_PROTO'] != "https") {

    $redirect = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header("Location:$redirect");

    exit;
} else {
    include_once "index.html";
}
