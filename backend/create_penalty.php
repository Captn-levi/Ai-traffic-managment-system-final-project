<?php

// ==============================
// SHOW ERRORS (Development Only)
// ==============================

error_reporting(E_ALL);
ini_set('display_errors', 1);

// ==============================
// HEADERS
// ==============================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ==============================
// DATABASE CONNECTION
// ==============================

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "traffic_system"
);

if ($conn->connect_error) {

    die(json_encode([
        "success" => false,
        "error" => $conn->connect_error
    ]));

}

// ==============================
// READ JSON
// ==============================

$rawData = file_get_contents("php://input");

$data = json_decode($rawData, true);

// Debug JSON
if (json_last_error() !== JSON_ERROR_NONE) {

    echo json_encode([
        "success" => false,
        "error" => "JSON Error: " . json_last_error_msg(),
        "raw" => $rawData
    ]);

    exit();

}

// ==============================
// GET VALUES
// ==============================

$driver_id      = intval($data["driver_id"] ?? 0);
$vehicle_id     = intval($data["vehicle_id"] ?? 0);
$plate_number   = trim($data["plate_number"] ?? "");
$type           = trim($data["type"] ?? "");
$violation_id   = intval($data["violation_id"] ?? 0);
$location       = trim($data["location"] ?? "");
$amount         = floatval($data["amount"] ?? 0);
$police_id      = intval($data["police_id"] ?? 0);
$notes          = trim($data["notes"] ?? "");
$evidence_image = trim($data["evidence_image"] ?? "");

$status = "Unpaid";
$date = date("Y-m-d");

// ==============================
// VALIDATION
// ==============================

if (

    $driver_id <= 0 ||
    $vehicle_id <= 0 ||
    empty($plate_number) ||
    empty($type) ||
    $amount <= 0 ||
    $police_id <= 0

) {

    echo json_encode([
        "success" => false,
        "error" => "Missing required fields",
        "received" => $data
    ]);

    exit();

}

// ==============================
// INSERT
// ==============================

$sql = "

INSERT INTO penalty (

driver_id,
type,
location,
amount,
status,
date,
created_by,
plate_number,
violation_id,
police_id,
vehicle_id,
evidence_image,
notes

)

VALUES (

?,?,?,?,?,?,?,?,?,?,?,?,?

)

";

$stmt = $conn->prepare($sql);

if (!$stmt) {

    echo json_encode([
        "success" => false,
        "error" => $conn->error
    ]);

    exit();

}

// ==============================
// BIND
// ==============================

$stmt->bind_param(

    "issdssisiiiss",

    $driver_id,
    $type,
    $location,
    $amount,
    $status,
    $date,
    $police_id,
    $plate_number,
    $violation_id,
    $police_id,
    $vehicle_id,
    $evidence_image,
    $notes

);

// ==============================
// EXECUTE
// ==============================

if (!$stmt->execute()) {

    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);

    exit();

}

// ==============================
// SUCCESS
// ==============================

echo json_encode([

    "success" => true,
    "message" => "Penalty created successfully",
    "penalty_id" => $conn->insert_id

]);

$stmt->close();
$conn->close();

?>