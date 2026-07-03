<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to      = "ajay@uptodateenterprise.com";
    $name    = htmlspecialchars(strip_tags(trim($_POST["name"] ?? "")));
    $company = htmlspecialchars(strip_tags(trim($_POST["company"] ?? "")));
    $email   = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags(trim($_POST["message"] ?? "")));

    if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html?status=error");
        exit;
    }

    $subject = "New Enquiry from $name – Uptodate Enterprise Website";
    $body    = "Name: $name\nCompany: $company\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: no-reply@uptodateaccount.com\r\nReply-To: $email\r\nX-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        header("Location: index.html?status=success");
    } else {
        header("Location: index.html?status=error");
    }
    exit;
}
header("Location: index.html");
exit;
