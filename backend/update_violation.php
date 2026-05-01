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

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$amount = $data->amount;

$stmt = $conn->prepare("UPDATE violation_types SET amount=? WHERE id=?");
$stmt->bind_param("di", $amount, $id);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false]);
}
?>