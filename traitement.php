<?php
header('Content-Type: application/json');

$host = 'vfhqbjijanam.mysql.db';
$user = 'vfhqbjijanam';
$pass = 'LE_MOT_DE_PASSE_DE_LA_BASE';
$db   = 'vfhqbjijanam';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion']);
    exit;
}

$prenom      = $conn->real_escape_string($_POST['prenom'] ?? '');
$email       = $conn->real_escape_string($_POST['email'] ?? '');
$telephone   = $conn->real_escape_string($_POST['telephone'] ?? '');
$age_bebe    = $conn->real_escape_string($_POST['age_bebe'] ?? '');
$allaitement = $conn->real_escape_string($_POST['allaitement'] ?? '');
$connu_par   = $conn->real_escape_string($_POST['connu_par'] ?? '');
$besoin      = $conn->real_escape_string($_POST['besoin'] ?? '');

if (empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email requis']);
    exit;
}

$sql = "INSERT INTO inscriptions (prenom, email, telephone, age_bebe, allaitement, connu_par, besoin)
        VALUES ('$prenom', '$email', '$telephone', '$age_bebe', '$allaitement', '$connu_par', '$besoin')";

if ($conn->query($sql)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $conn->error]);
}

$conn->close();
