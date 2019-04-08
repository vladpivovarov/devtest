<?php

    include "pdo.php";

    $sql = "SELECT * FROM comments";
    $query = $pdo->prepare($sql);
    $query->execute();
    $comments = $query->fetchAll(PDO::FETCH_OBJ);

    $data = array();

    foreach($comments as $comment) {
        array_push($data, ["name"=>$comment->name, "email"=>$comment->email, "text"=>$comment->text, "id"=> $comment->id]);
    }

    header('Content-type: application/json');
    echo json_encode($data);



