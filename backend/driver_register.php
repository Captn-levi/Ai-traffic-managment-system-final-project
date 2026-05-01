<?php
// ✅ CORS FIX (VERY IMPORTANT)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// ✅ DATABASE CONNECTION
$conn = new mysqli("localhost", "root", "", "traffic_system");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed"
    ]);
    exit;
}

// ✅ GET JSON DATA
$data = json_decode(file_get_contents("php://input"), true);

// ✅ EXTRACT DATA
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$license = $data['license'] ?? '';
$password = $data['password'] ?? '';

// ✅ VALIDATION
if (!$name || !$email || !$phone || !$license || !$password) {
    echo json_encode([
        "success" => false,
        "error" => "All fields are required"
    ]);
    exit;
}

// ✅ CHECK IF EMAIL EXISTS
$check = $conn->prepare("SELECT id FROM driver WHERE email = ?");
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

// ✅ INSERT DRIVER
$stmt = $conn->prepare(
    "INSERT INTO driver (name, email, password, phone, license_number) 
     VALUES (?, ?, ?, ?, ?)"
);

$stmt->bind_param("sssss", $name, $email, $password, $phone, $license);

// ✅ EXECUTE
if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Driver registered successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
}

// ✅ CLOSE CONNECTION
$stmt->close();
$conn->close();
?>