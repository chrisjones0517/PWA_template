<?php

function console_log($output, $with_script_tags = true)
{
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';

    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

include_once "index.html";

console_log($_SERVER['ORIG_URI']);

// echo ("request uri\n" . $_SERVER['REQUEST_URI']);

// if ($_SERVER["HTTPS"] != "on") {

//     $redirect = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
//     header("Location:$redirect");

//     exit;
// } else {
//     include_once "index.html";
// }
