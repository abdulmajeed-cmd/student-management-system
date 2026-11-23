<?php

header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? "";

if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "Student ID is required"
    ]);
    exit;
}

$sql = "DELETE FROM mahasiswa WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "success" => true,
        "message" => "Student deleted successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete student"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>