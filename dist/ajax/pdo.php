<?php

$host = "db4free.net:3306";
$db = "base_for_test";
$user = "root_for_test";
$pass = "12345678";

$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
