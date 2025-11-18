<?php
/**
 * Image Upload Script for Hostinger
 * Upload this file to: public_html/api/upload.php
 * 
 * This script:
 * - Accepts file uploads from Next.js API
 * - Validates file type and size
 * - Saves files to uploads directory
 * - Returns public URL
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Change to your domain in production
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Security: Check for upload secret key
$uploadSecret = '1468e930fbe317ed2efd166239cabcd1099ae0e1a5a674628853d819acf64e26'; // Change this!
$providedSecret = $_SERVER['HTTP_X_UPLOAD_SECRET'] ?? '';

if ($providedSecret !== $uploadSecret) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Configuration
$baseUploadDir = __DIR__ . '/../uploads/'; // Base: public_html/uploads/
$maxFileSize = 5 * 1024 * 1024; // 5MB
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$allowedFolders = ['gallery', 'courses', 'general']; // Allowed subfolders

// Get folder from request (default: general)
$folder = $_POST['folder'] ?? 'general';

// Validate folder name
if (!in_array($folder, $allowedFolders)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid folder. Allowed: gallery, courses, general'
    ]);
    exit();
}

// Create upload directory structure: uploads/{folder}/
$uploadDir = $baseUploadDir . $folder . '/';

// Create directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Check if file was uploaded
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No file uploaded or upload error occurred',
        'error' => $_FILES['file']['error'] ?? 'No file'
    ]);
    exit();
}

$file = $_FILES['file'];

// Validate file size
if ($file['size'] > $maxFileSize) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'File too large. Maximum size is 5MB'
    ]);
    exit();
}

// Validate file type
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid file type. Only images are allowed'
    ]);
    exit();
}

// Get file extension
$fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// Validate extension
if (!in_array($fileExtension, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid file extension'
    ]);
    exit();
}

// Generate unique filename
$timestamp = time();
$randomString = bin2hex(random_bytes(8));
$newFilename = "{$timestamp}_{$randomString}.{$fileExtension}";
$targetPath = $uploadDir . $newFilename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Set proper permissions
    chmod($targetPath, 0644);
    
    // Generate public URL
    // Change this to your actual Hostinger domain
    $baseUrl = 'https://lightseagreen-jackal-181324.hostingersite.com'; // CHANGE THIS!
    $publicUrl = "{$baseUrl}/uploads/{$folder}/{$newFilename}";
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'File uploaded successfully',
        'filename' => $newFilename,
        'url' => $publicUrl,
        'size' => $file['size'],
        'type' => $file['type']
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save file'
    ]);
}
?>

