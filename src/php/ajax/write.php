<?php
    include "pdo.php";

	$name = trim(filter_var($_POST["name"], FILTER_SANITIZE_STRING));
	$email = trim(filter_var($_POST["email"], FILTER_SANITIZE_EMAIL));
	$text = trim(filter_var($_POST["text"], FILTER_SANITIZE_STRING));

    $sql = "INSERT INTO comments (name, email, text) VALUES (:name, :email, :text)";

    $query = $pdo->prepare($sql);
    $query->execute(["name"=>$name,"email"=>$email,"text"=>$text]);

    echo "ok";







