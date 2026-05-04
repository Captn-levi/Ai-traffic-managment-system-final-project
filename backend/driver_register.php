<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$conn = new mysqli("localhost", "root", "", "traffic_system");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$phone = $data['phone'];
$license = $data['license'];

if (!$name || !$email || !$password || !$phone || !$license) {
    echo json_encode(["success"=>false,"error"=>"All fields required"]);
    exit;
}

// UPDATE
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && $id) {
    $stmt = $conn->prepare("UPDATE driver SET name=?, email=?, password=?, phone=?, license_number=? WHERE id=?");
    $stmt->bind_param("sssssi",$name,$email,$password,$phone,$license,$id);
} else {
    // INSERT
    $stmt = $conn->prepare("INSERT INTO driver (name,email,password,phone,license_number) VALUES (?,?,?,?,?)");
    $stmt->bind_param("sssss",$name,$email,$password,$phone,$license);
}

if ($stmt->execute()) {
    echo json_encode(["success"=>true]);
} else {
    echo json_encode(["success"=>false,"error"=>$stmt->error]);
}