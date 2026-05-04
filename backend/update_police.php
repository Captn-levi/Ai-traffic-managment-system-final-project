<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$conn = new mysqli("localhost", "root", "", "traffic_system");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$badge_id = $data['badge_id'];
$phone = $data['phone'];

$stmt = $conn->prepare("
  UPDATE police 
  SET name=?, email=?, password=?, badge_id=?, phone=? 
  WHERE id=?
");

$stmt->bind_param("sssssi", $name, $email, $password, $badge_id, $phone, $id);

echo json_encode(["success" => $stmt->execute()]);