<?php
// ✅ CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// ✅ DB connection
$conn = new mysqli("localhost", "root", "", "traffic_system");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "error" => "DB connection failed"
    ]);
    exit;
}

// ✅ Read input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['penalty_id'])) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid input"
    ]);
    exit;
}

$penalty_id = $data['penalty_id'];

// ✅ Update penalty
$stmt = $conn->prepare("UPDATE penalty SET status='Paid' WHERE id=?");

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error" => "Prepare failed"
    ]);
    exit;
}

$stmt->bind_param("i", $penalty_id);
$success = $stmt->execute();

if ($success) {
    echo json_encode([
        "success" => true,
        "message" => "Penalty paid successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Payment failed"
    ]);
}
?>