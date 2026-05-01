<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "traffic_system");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$name = $data['name'];
$amount = $data['amount'];

$query = "UPDATE violation_type 
          SET name='$name', penalty_amount='$amount'
          WHERE violation_type_id='$id'";

if ($conn->query($query)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
