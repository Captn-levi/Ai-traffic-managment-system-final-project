<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type"); // ✅ ADD THIS
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

if ($conn->connect_error) {
  echo json_encode(["success" => false, "error" => "DB connection failed"]);
  exit;
}

// 🔥 FIX: Read raw input safely
$raw = file_get_contents("php://input");

// DEBUG (optional)
if (!$raw) {
  echo json_encode(["success" => false, "error" => "No input received"]);
  exit;
}

$data = json_decode($raw, true);

// 🔥 FIX: Check decode
if (!$data) {
  echo json_encode(["success" => false, "error" => "Invalid JSON"]);
  exit;
}

$name = $data['name'] ?? '';
$description = $data['description'] ?? '';
$amount = (double)($data['amount'] ?? 0);

if (empty($name) || empty($amount)) {
  echo json_encode(["success" => false, "error" => "Missing fields"]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO violation_types (name, description, amount) VALUES (?, ?, ?)");
$stmt->bind_param("ssd", $name, $description, $amount);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $stmt->error]);
}
?>