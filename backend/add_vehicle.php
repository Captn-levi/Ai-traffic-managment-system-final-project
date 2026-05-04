<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$conn = new mysqli("localhost", "root", "", "traffic_system");

if ($conn->connect_error) {
  echo json_encode(["success" => false]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$driver_id = $data['driver_id'] ?? 0;
$plate = strtoupper($data['plate_number'] ?? '');
$type = $data['vehicle_type'] ?? '';
$model = $data['model'] ?? '';
$color = $data['color'] ?? '';

if (!$driver_id || !$plate) {
  echo json_encode(["success" => false, "error" => "Missing fields"]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO vehicles (driver_id, plate_number, vehicle_type, model, color) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $driver_id, $plate, $type, $model, $color);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $stmt->error]);
}
?>