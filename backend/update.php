<?php

header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? "";
$nama = $data["nama"] ?? "";
$nim = $data["nim"] ?? "";

if (empty($id) || empty($nama) || empty($nim)) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

$sql = "UPDATE mahasiswa SET nama = ?, nim = ? WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "ssi", $nama, $nim, $id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "success" => true,
        "message" => "Student updated successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update student"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>