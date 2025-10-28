// Admin API for managing gallery
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET all gallery images
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const admin = await getAdminFromToken(token);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const images = await query(
      `SELECT * FROM gallery ORDER BY display_order ASC, uploaded_at DESC`
    );

    return NextResponse.json({
      success: true,
      images
    });
  } catch (error) {
    console.error('Get gallery error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

// CREATE gallery image
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const admin = await getAdminFromToken(token);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { imageUrl, caption, displayOrder } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Image URL is required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO gallery (image_url, caption, display_order) 
       VALUES (?, ?, ?)`,
      [imageUrl, caption || '', displayOrder || 0]
    );

    return NextResponse.json({
      success: true,
      message: 'Image added successfully',
      imageId: result.insertId
    });
  } catch (error) {
    console.error('Create gallery image error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add image' },
      { status: 500 }
    );
  }
}

// UPDATE gallery image
export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const admin = await getAdminFromToken(token);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id, imageUrl, caption, displayOrder } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Image ID is required' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE gallery SET image_url = ?, caption = ?, display_order = ? 
       WHERE id = ?`,
      [imageUrl, caption || '', displayOrder || 0, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Image updated successfully'
    });
  } catch (error) {
    console.error('Update gallery image error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update image' },
      { status: 500 }
    );
  }
}

// DELETE gallery image
export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const admin = await getAdminFromToken(token);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Image ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM gallery WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

