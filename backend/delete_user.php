<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

$conn = new mysqli("localhost", "root", "", "traffic_system");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? 0;
$role = $data['role'] ?? '';

if (!$id || !$role) {
    echo json_encode(["success" => false, "error" => "Missing data"]);
    exit;
}

if ($role === "driver") {
    $stmt = $conn->prepare("DELETE FROM driver WHERE id=?");
} else if ($role === "police") {
    $stmt = $conn->prepare("DELETE FROM police WHERE id=?");
} else {
    echo json_encode(["success" => false, "error" => "Invalid role"]);
    exit;
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}