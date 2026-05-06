<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "traffic_system");

if ($conn->connect_error) {
    echo json_encode(["success" => false]);
    exit;
}

$plate = $_GET['plate'] ?? '';

if (!$plate) {
    echo json_encode([]);
    exit;
}

// 🔥 JOIN penalty + driver if needed
$stmt = $conn->prepare("
    SELECT 
        id,
        type,
        amount,
        status,
        location,
        date
    FROM penalty
    WHERE plate_number = ?
    ORDER BY date DESC
");

$stmt->bind_param("s", $plate);
$stmt->execute();

$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>