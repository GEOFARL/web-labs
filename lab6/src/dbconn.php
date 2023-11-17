<?php

$host = 'localhost';
$dbname = 'tabs';
$user = 'php';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}