<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$conn = new mysqli("localhost", "root", "", "traffic_system");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// 🔥 fields
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$badge_id = $data['badge_id'] ?? '';
$phone = $data['phone'] ?? '';   // ✅ NEW

// validation
if (!$name || !$email || !$password || !$badge_id || !$phone) {
    echo json_encode([
        "success" => false,
        "error" => "All fields are required"
    ]);
    exit;
}

// check email
$check = $conn->prepare("SELECT id FROM police WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "error" => "Email already exists"
    ]);
    exit;
}

// insert
$stmt = $conn->prepare(
    "INSERT INTO police (name, email, password, badge_id, phone)
     VALUES (?, ?, ?, ?, ?)"
);

$stmt->bind_param("sssss", $name, $email, $password, $badge_id, $phone);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Police added successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>