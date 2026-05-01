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

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

if ($conn->query("DELETE FROM driver WHERE driver_id='$id'")) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>