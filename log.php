<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST['city'])) {
        http_response_code(400);
        echo "Missing city name.";
        exit;
    }

    $city = trim($_POST['city']);

    require 'db_config.php';

    $stmt = $conn->prepare("INSERT INTO search_logs (city) VALUES (?)");
    $stmt->bind_param("s", $city);

    if ($stmt->execute()) {
        echo "Logged successfully.";
    } else {
        echo "Failed to log.";
    }

    $stmt->close();
    $conn->close();
}
?>
