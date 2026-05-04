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

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$badgeId = $data['badgeId'] ?? '';
$password = $data['password'] ?? '';

if (!$badgeId || !$password) {
    echo json_encode(["success" => false, "error" => "Missing fields"]);
    exit;
}

// 🔍 Check police table
$stmt = $conn->prepare("SELECT id, name, badge_id FROM police WHERE badge_id=? AND password=?");
$stmt->bind_param("ss", $badgeId, $password);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "user" => $user
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Invalid credentials"
    ]);
}
?>