<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "traffic_system");

// total penalties
$total = $conn->query("SELECT COUNT(*) as total FROM penalty")->fetch_assoc();

// active users
$users = $conn->query("SELECT COUNT(*) as users FROM driver")->fetch_assoc();

// pending
$pending = $conn->query("SELECT COUNT(*) as pending FROM penalty WHERE status='Pending'")->fetch_assoc();

// revenue
$revenue = $conn->query("SELECT SUM(amount) as revenue FROM penalty WHERE status='Paid'")->fetch_assoc();

echo json_encode([
    "total" => $total['total'],
    "users" => $users['users'],
    "pending" => $pending['pending'],
    "revenue" => $revenue['revenue'] ?? 0
]);
?>