<?php
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $filePath = 'records.json';

    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            http_response_code(204);
            echo json_encode(['message' => 'File deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete the file']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'File not found']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'DELETE method is required']);
}
?>
