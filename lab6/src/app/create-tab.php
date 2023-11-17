<?php

if (isset($_POST["title"])) {
  require '../dbconn.php';

  $title = htmlspecialchars($_POST['title']);
  $content = htmlspecialchars($_POST['content']);

  $stmt = $conn->prepare('INSERT INTO tabs(title, content) VALUES (?, ?)');
  $res = $stmt->execute([$title, $content]);

  $conn = null;
  exit();
}