<?php
require '../dbconn.php';
$tableName = "tabs";

// Drop all records from the table
$truncateQuery = "TRUNCATE TABLE $tableName";
$conn->exec($truncateQuery);

// Redirect back to the current page
header("Location: " . $_SERVER['HTTP_REFERER']);
exit;