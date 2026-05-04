<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "traffic_system");

$plate = $_GET['plate'] ?? '';

$stmt = $conn->prepare("
  SELECT v.id, v.plate_number, d.name
  FROM vehicles v
  JOIN driver d ON v.driver_id = d.id
  WHERE v.plate_number = ?
");

$stmt->bind_param("s", $plate);
$stmt->execute();

$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
  echo json_encode(["found" => true, "vehicle" => $row]);
} else {
  echo json_encode(["found" => false]);
}
?>