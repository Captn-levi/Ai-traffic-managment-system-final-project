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

// Check connection
if ($conn->connect_error) {
  echo json_encode(["success" => false, "error" => "DB connection failed"]);
  exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? 0;

// Debug (IMPORTANT)
if (!$id) {
  echo json_encode([
    "success" => false,
    "error" => "ID missing",
    "received" => $data
  ]);
  exit;
}

// Prepare delete
$stmt = $conn->prepare("DELETE FROM violation_types WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode([
    "success" => false,
    "error" => $stmt->error
  ]);
}
?>