<?php
//  CORS 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//  HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

//  DB connection
$conn = new mysqli("localhost", "root", "", "traffic_system");

//  Read input 
$raw = file_get_contents("php://input");

if (!$raw) {
    echo json_encode([
        "success" => false,
        "error" => "No input received"
    ]);
    exit;
}

$data = json_decode($raw, true);

if (!$data || !isset($data['driver_id'])) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid input"
    ]);
    exit;
}

$driver_id = $data['driver_id'];

// ✅ Use prepared statement (important)
$stmt = $conn->prepare("SELECT * FROM penalty WHERE driver_id=?");
$stmt->bind_param("i", $driver_id);
$stmt->execute();
$result = $stmt->get_result();

$penalties = [];

while ($row = $result->fetch_assoc()) {
    $penalties[] = $row;
}

echo json_encode($penalties);
?>