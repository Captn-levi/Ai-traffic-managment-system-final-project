<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ HANDLE PREFLIGHT
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "traffic_system");

// ❌ DB ERROR
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed"
    ]);
    exit;
}

$users = [];

/* ======================
   ✅ GET DRIVERS
====================== */
$driverQuery = "SELECT id, name, email, phone, license_number FROM driver";
$driverResult = $conn->query($driverQuery);

if ($driverResult) {
    while ($row = $driverResult->fetch_assoc()) {
        $row['role'] = 'driver';
        $users[] = $row;
    }
}

/* ======================
   ✅ GET POLICE
====================== */
$checkPoliceTable = $conn->query("SHOW TABLES LIKE 'police'");

if ($checkPoliceTable && $checkPoliceTable->num_rows > 0) {

    $policeQuery = "SELECT id, name, email, phone, badge_id FROM police";
    $policeResult = $conn->query($policeQuery);

    if ($policeResult) {
        while ($row = $policeResult->fetch_assoc()) {
            $row['role'] = 'police';
            // ❌ REMOVE THIS: $row['phone'] = null;
            $users[] = $row;
        }
    }
}

/* ======================
   ✅ RETURN RESPONSE
====================== */
echo json_encode($users);
?>