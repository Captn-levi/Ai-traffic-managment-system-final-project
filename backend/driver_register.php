<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

// ==========================
// ✅ DB CONNECTION
// ==========================
$conn = new mysqli("localhost", "root", "", "traffic_system");

if ($conn->connect_error) {
    echo json_encode(["success"=>false,"error"=>"DB connection failed"]);
    exit;
}

// ==========================
// ✅ GET JSON DATA
// ==========================
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success"=>false,"error"=>"Invalid JSON"]);
    exit;
}

// ==========================
// 🔥 BASIC DATA
// ==========================
$id       = $data['id'] ?? null;
$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');
$phone    = trim($data['phone'] ?? '');
$license  = trim($data['license'] ?? '');

// ==========================
// 🚗 VEHICLE DATA
// ==========================
$plate = strtoupper(trim($data['plate_number'] ?? ''));
$type  = trim($data['vehicle_type'] ?? '');
$model = trim($data['model'] ?? '');
$color = trim($data['color'] ?? '');

// ==========================
// ✅ VALIDATION
// ==========================
if (!$name || !$email) {
    echo json_encode(["success"=>false,"error"=>"Name and Email required"]);
    exit;
}

// ==========================
// 🔁 UPDATE DRIVER
// ==========================
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && $id) {

    if (!empty($password)) {
        $stmt = $conn->prepare("
            UPDATE driver 
            SET name=?, email=?, password=?, phone=?, license_number=? 
            WHERE id=?
        ");
        $stmt->bind_param("sssssi", $name, $email, $password, $phone, $license, $id);
    } else {
        $stmt = $conn->prepare("
            UPDATE driver 
            SET name=?, email=?, phone=?, license_number=? 
            WHERE id=?
        ");
        $stmt->bind_param("ssssi", $name, $email, $phone, $license, $id);
    }

    if (!$stmt->execute()) {
        echo json_encode(["success"=>false,"error"=>$stmt->error]);
        exit;
    }

    // ==========================
    // 🔁 UPDATE VEHICLE (optional)
    // ==========================
    if (!empty($plate)) {

        $checkVehicle = $conn->prepare("
            SELECT id FROM vehicles WHERE driver_id=?
        ");
        $checkVehicle->bind_param("i", $id);
        $checkVehicle->execute();
        $vehicleRes = $checkVehicle->get_result();

        if ($vehicleRes->num_rows > 0) {
            // UPDATE existing vehicle
            $vehicle = $vehicleRes->fetch_assoc();

            $updateVehicle = $conn->prepare("
                UPDATE vehicles
                SET plate_number=?, vehicle_type=?, model=?, color=?
                WHERE id=?
            ");
            $updateVehicle->bind_param("ssssi", $plate, $type, $model, $color, $vehicle['id']);
            $updateVehicle->execute();

        } else {
            // INSERT new vehicle
            $insertVehicle = $conn->prepare("
                INSERT INTO vehicles (driver_id, plate_number, vehicle_type, model, color)
                VALUES (?, ?, ?, ?, ?)
            ");
            $insertVehicle->bind_param("issss", $id, $plate, $type, $model, $color);
            $insertVehicle->execute();
        }
    }

    echo json_encode(["success"=>true, "message"=>"Driver updated"]);
    exit;
}

// ==========================
// ➕ CREATE DRIVER
// ==========================
if (!$password || !$phone || !$license) {
    echo json_encode(["success"=>false,"error"=>"All fields required"]);
    exit;
}

// 🔥 CHECK EMAIL
$check = $conn->prepare("SELECT id FROM driver WHERE email=?");
$check->bind_param("s", $email);
$check->execute();
$res = $check->get_result();

if ($res->num_rows > 0) {
    echo json_encode(["success"=>false,"error"=>"Email already exists"]);
    exit;
}

// ==========================
// ✅ INSERT DRIVER
// ==========================
$stmt = $conn->prepare("
    INSERT INTO driver (name,email,password,phone,license_number)
    VALUES (?,?,?,?,?)
");

$stmt->bind_param("sssss", $name, $email, $password, $phone, $license);

if (!$stmt->execute()) {
    echo json_encode(["success"=>false,"error"=>$stmt->error]);
    exit;
}

$driver_id = $stmt->insert_id;

// ==========================
// 🚗 CREATE VEHICLE (optional)
// ==========================
if (!empty($plate)) {

    $checkVehicle = $conn->prepare("SELECT id FROM vehicles WHERE plate_number=?");
    $checkVehicle->bind_param("s", $plate);
    $checkVehicle->execute();
    $vehicleRes = $checkVehicle->get_result();

    if ($vehicleRes->num_rows === 0) {

        $vehicleStmt = $conn->prepare("
            INSERT INTO vehicles (driver_id, plate_number, vehicle_type, model, color)
            VALUES (?, ?, ?, ?, ?)
        ");

        $vehicleStmt->bind_param("issss", $driver_id, $plate, $type, $model, $color);
        $vehicleStmt->execute();
    }
}

// ==========================
// ✅ SUCCESS
// ==========================
echo json_encode([
    "success"=>true,
    "driver_id"=>$driver_id
]);

$conn->close();
?>