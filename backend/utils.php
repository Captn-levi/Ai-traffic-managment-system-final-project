<?php

function logAction($conn, $action) {
    $stmt = $conn->prepare("INSERT INTO audit_logs (action) VALUES (?)");
    $stmt->bind_param("s", $action);
    $stmt->execute();
}

?>
 <!-- This file can be included in all PHP 
 scripts to provide common functions like logging, 
 DB connection, etc.
function that recored to auditLogs.tsx 
from all actions performed by admin and driver. 
This will help us to track all the activities in 
the system and also to debug any issues. -->