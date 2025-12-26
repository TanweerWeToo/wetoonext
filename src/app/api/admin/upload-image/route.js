// Next.js API Route for Image Upload
// This forwards files to Hostinger's PHP upload endpoint
import { NextResponse } from 'next/server';
import { getAdminFromToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Note: In Next.js App Router, body parsing is handled automatically
// No need for config export - request.formData() works without it

export async function POST(request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const admin = await getAdminFromToken(token);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Get form data from request
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'general'; // gallery, courses, or general

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Prepare form data to send to Hostinger
    const hostingerFormData = new FormData();
    hostingerFormData.append('file', file);
    hostingerFormData.append('folder', folder);

    // Upload to Hostinger PHP endpoint
    // IMPORTANT: Change this to your actual Hostinger domain
    const hostingerUploadUrl = process.env.HOSTINGER_UPLOAD_URL || 'https://yourdomain.com/api/upload.php';
    const uploadSecret = process.env.UPLOAD_SECRET_KEY || 'YOUR_SECURE_UPLOAD_SECRET_KEY_HERE';

    const uploadResponse = await fetch(hostingerUploadUrl, {
      method: 'POST',
      headers: {
        'X-Upload-Secret': uploadSecret,
      },
      body: hostingerFormData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({}));
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || 'Upload to Hostinger failed',
          details: errorData
        },
        { status: uploadResponse.status }
      );
    }

    const uploadData = await uploadResponse.json();

    if (!uploadData.success) {
      return NextResponse.json(
        { success: false, message: uploadData.message || 'Upload failed' },
        { status: 500 }
      );
    }

    // Return success with file URL
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: uploadData.url,
      filename: uploadData.filename,
      size: uploadData.size,
      type: uploadData.type,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during upload',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

