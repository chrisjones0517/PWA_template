<?php

if (!isset($_SERVER["HTTPS"]) || $_SERVER != "on") {
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"], true, 301);

    exit;
}

include_once "index.html";
