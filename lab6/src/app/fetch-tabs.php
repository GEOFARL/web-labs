<?php

require '../dbconn.php';

$tabs = $conn->query("SELECT * FROM tabs");
$data = $tabs->fetchAll(PDO::FETCH_ASSOC);


$jsonData = json_encode($data, true);

header('Content-Type: application/json');
echo $jsonData;
