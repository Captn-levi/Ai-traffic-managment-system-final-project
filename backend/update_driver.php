<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ HANDLE PREFLIGHT
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// ✅ DB CONNECTION
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

// ✅ EXTRACT DATA (MATCH FRONTEND)
$id       = $data['id'] ?? 0;
$name     = $data['name'] ?? '';
$email    = $data['email'] ?? '';
$phone    = $data['phone'] ?? '';
$license  = $data['license'] ?? ''; // ✅ FIXED
$password = $data['password'] ?? ''; // optional

// ✅ VALIDATION
if (!$id || !$name || !$email) {
    echo json_encode([
        "success" => false,
        "error" => "Missing required fields"
    ]);
    exit;
}

// 🔥 UPDATE LOGIC
if (!empty($password)) {

    // ✅ UPDATE WITH PASSWORD
    $stmt = $conn->prepare("
        UPDATE driver 
        SET name=?, email=?, phone=?, license_number=?, password=? 
        WHERE id=?
    ");

    $stmt->bind_param("sssssi", $name, $email, $phone, $license, $password, $id);

} else {

    // ✅ UPDATE WITHOUT PASSWORD
    $stmt = $conn->prepare("
        UPDATE driver 
        SET name=?, email=?, phone=?, license_number=? 
        WHERE id=?
    ");

    $stmt->bind_param("ssssi", $name, $email, $phone, $license, $id);
}

// ✅ EXECUTE
if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Driver updated successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
}

// ✅ CLOSE
$stmt->close();
$conn->close();
?>