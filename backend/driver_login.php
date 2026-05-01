<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Handle preflight request (VERY IMPORTANT)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "traffic_system");

$raw = file_get_contents("php://input");

if (!$raw) {
    echo json_encode([
        "success" => false,
        "error" => "No raw input received"
    ]);
    exit;
}

$data = json_decode($raw, true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid JSON",
        "raw" => $raw
    ]);
    exit;
}

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$stmt = $conn->prepare("SELECT * FROM driver WHERE email=? AND password=?");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "user" => $row
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid credentials"
    ]);
}
?>