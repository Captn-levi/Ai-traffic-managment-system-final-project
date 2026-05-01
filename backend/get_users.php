<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "traffic_system");

$result = $conn->query("SELECT driver_id, name, email FROM driver");

$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
?>