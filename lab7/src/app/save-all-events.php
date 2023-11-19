<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $recordStrings = json_decode($postData, true);

    if ($recordStrings !== null) {
        $formattedRecords = array_map(function($recordString) {
            $parts = explode(' - ', $recordString);
            return [
                'id' => intval($parts[0]),
                'datetime' => date('Y-m-d H:i:s', strtotime($parts[2])),
                'data' => $parts[1],
            ];
        }, $recordStrings);

        $filePath = 'records.json';

        if (file_exists($filePath)) {
            unlink($filePath);
        }

        file_put_contents($filePath, json_encode($formattedRecords, JSON_PRETTY_PRINT));

        header('Content-Type: application/json');
        echo json_encode(['message' => 'Records saved successfully']);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'POST method is required']);
}
?>
