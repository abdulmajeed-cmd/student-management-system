<?php

header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$nama = $data["nama"] ?? "";
$nim = $data["nim"] ?? "";

if (empty($nama) || empty($nim)) {
    echo json_encode([
        "success" => false,
        "message" => "Name and NIM are required"
    ]);
    exit;
}

$sql = "INSERT INTO mahasiswa (nama, nim) VALUES (?, ?)";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "ss", $nama, $nim);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "success" => true,
        "message" => "Student saved successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to save student"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>