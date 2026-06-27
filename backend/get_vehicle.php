<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "traffic_system");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed"
    ]);
    exit;
}

$plate = $_GET['plate'] ?? '';

$plate = trim($plate);

if (!$plate) {
    echo json_encode([
        "success" => false,
        "error" => "Plate number missing"
    ]);
    exit;
}

$stmt = $conn->prepare("
    SELECT
        v.id AS vehicle_id,
        v.plate_number,
        v.vehicle_type,
        v.model,
        v.color,
        v.created_at AS registration_date,

        d.id AS driver_id,
        d.name AS owner,
        d.email,
        d.phone,
        d.license_number,
        d.address,

        COUNT(p.id) AS violations

    FROM vehicles v

    LEFT JOIN driver d
        ON v.driver_id = d.id

    LEFT JOIN penalty p
        ON v.driver_id = p.driver_id

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
        "vehicle" => $data
    ]);

} else {

    echo json_encode([
        "success" => false,
        "error" => "Vehicle not found"
    ]);
}
?>