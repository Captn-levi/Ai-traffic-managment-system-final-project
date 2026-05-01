<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$conn = new mysqli("localhost", "root", "", "traffic_system");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$email || !$password) {
  echo json_encode(["success" => false, "error" => "Missing credentials"]);
  exit;
}

$stmt = $conn->prepare("SELECT * FROM admin WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $admin = $result->fetch_assoc();
  echo json_encode([
    "success" => true,
    "admin" => $admin
  ]);
} else {
  echo json_encode([
    "success" => false,
    "error" => "Invalid email or password"
  ]);
}
?>