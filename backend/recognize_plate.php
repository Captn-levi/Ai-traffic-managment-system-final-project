<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

// 🔥 TEMP FAKE AI (replace later)
echo json_encode([
    "success" => true,
    "plate" => "AA-12345"
]);
?>