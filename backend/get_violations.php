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

if ($conn->connect_error) {
  echo json_encode(["success" => false, "error" => $conn->connect_error]);
  exit;
}

$result = $conn->query("SELECT * FROM violation_types");

$data = [];

while ($row = $result->fetch_assoc()) {
  $row['count'] = 0; // temporary until we track real counts
  $data[] = $row;
}

echo json_encode($data);
?>