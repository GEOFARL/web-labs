<?php
$filePath = 'records.json';

if (file_exists($filePath)) {
    $fileContents = file_get_contents($filePath);

    if ($fileContents !== false) {
        header('Content-Type: application/json');
        echo $fileContents;
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to read file contents']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'File not found']);
}
?>
