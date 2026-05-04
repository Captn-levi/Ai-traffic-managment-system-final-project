<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "traffic_system");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("
UPDATE system_settings SET
ai_plate=?, ai_violation=?, confidence=?,
email_notify=?, sms_notify=?, push_notify=?,
two_factor=?, session_timeout=?, max_attempts=?,
timezone=?, currency=?, grace_period=?
WHERE id=1
");

$stmt->bind_param(
"iiiiiiiiissi",
$data['ai_plate'],
$data['ai_violation'],
$data['confidence'],
$data['email_notify'],
$data['sms_notify'],
$data['push_notify'],
$data['two_factor'],
$data['session_timeout'],
$data['max_attempts'],
$data['timezone'],
$data['currency'],
$data['grace_period']
);

$stmt->execute();

echo json_encode(["success" => true]);
?>