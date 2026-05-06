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
    echo json_encode(["success" => false]);
    exit;
}

// 🔥 JOIN vehicle + driver + penalty count
$stmt = $conn->prepare("
    SELECT 
        v.plate_number,
        v.vehicle_type,
        v.model,
        v.created_at AS registration_date,
        d.name AS owner,
        COUNT(p.id) AS violations
    FROM vehicles v
    LEFT JOIN driver d ON v.driver_id = d.id
    LEFT JOIN penalty p ON v.driver_id = p.driver_id
    WHERE v.plate_number = ?
    GROUP BY v.id
");

$stmt->bind_param("s", $plate);
$stmt->execute();

$result = $stmt->get_result();
$data = $result->fetch_assoc();

if ($data) {
    echo json_encode([
        "success" => true,
        "data" => $data
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Vehicle not found"
    ]);
}
?>