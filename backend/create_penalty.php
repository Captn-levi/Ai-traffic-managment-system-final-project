<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$conn = new mysqli("localhost", "root", "", "traffic_system");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "DB connection failed"]);
    exit;
}

// Get input
$data = json_decode(file_get_contents("php://input"), true);

$driver_id = $data['driver_id'] ?? 0;
$type = $data['type'] ?? '';
$location = $data['location'] ?? '';
$amount = $data['amount'] ?? 0;
$police_id = $data['police_id'] ?? 0;
$date = date("Y-m-d");

// Validation
if (!$driver_id || !$type || !$amount || !$police_id) {
    echo json_encode(["success" => false, "error" => "Missing fields"]);
    exit;
}

// Insert penalty
$stmt = $conn->prepare("
    INSERT INTO penalty (driver_id, type, location, amount, status, date, created_by)
    VALUES (?, ?, ?, ?, 'Unpaid', ?, ?)
");

$stmt->bind_param("issdsi", $driver_id, $type, $location, $amount, $date, $police_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}
?>