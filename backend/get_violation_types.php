<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$conn = new mysqli("localhost","root","","traffic_system");

$result = $conn->query("
SELECT
    id,
    name,
    description,
    amount
FROM violation_types
ORDER BY name
");

if (!$result) {
    echo json_encode([
        "success" => false,
        "error" => $conn->error
    ]);
    exit;
}

$violations = [];

while($row = $result->fetch_assoc()){
    $violations[] = $row;
}

echo json_encode([
    "success"=>true,
    "violations"=>$violations
]);
?>