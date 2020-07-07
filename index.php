<?php

if ($_SERVER["HTTPS"] != "on") {
    echo ("server\n" . $_SERVER);
    $redirect = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header("Location:$redirect");

    exit;
} else {
    include_once "index.html";
}
