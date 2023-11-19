<?php
function saveRecord($data)
{
    $records = file_exists('records.json') ? json_decode(file_get_contents('records.json'), true) : [];

    $record = [
        'id' => count($records) + 1, // Order number
        'datetime' => date('Y-m-d H:i:s'), // Current date-time
        'data' => $data, // Your record data
    ];

    $records[] = $record;

    file_put_contents('records.json', json_encode($records, JSON_PRETTY_PRINT));

    return $record;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if (strpos($contentType, 'application/json') !== false) {
        $postData = file_get_contents('php://input');
        $recordData = json_decode($postData, true);

        if ($recordData) {
            $savedRecord = saveRecord($recordData);

            header('Content-Type: application/json');
            echo json_encode($savedRecord);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
        }
    } else {
        $postData = file_get_contents('php://input');

        $savedRecord = saveRecord($postData);

        header('Content-Type: application/json');
        echo json_encode($savedRecord);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
