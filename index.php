<?php

if ($_SERVER["HTTPS"] != "on") {

    $redirect = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header("Location:$redirect");

    exit;
} else {
    include_once "index.html";
}
