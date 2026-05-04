<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "traffic_system");

$result = $conn->query("SELECT * FROM system_settings WHERE id=1");

echo json_encode($result->fetch_assoc());
?>