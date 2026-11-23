<?php

header("Content-Type: application/json");

include "db.php";

$sql = "SELECT id, nama, nim, created_at FROM mahasiswa ORDER BY id DESC";

$result = mysqli_query($conn, $sql);

if ($result) {

    $students = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $students[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $students
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to retrieve student records"
    ]);

}

mysqli_close($conn);

?>