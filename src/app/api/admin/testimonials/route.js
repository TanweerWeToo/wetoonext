// Admin API for managing testimonials (YouTube videos)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET all testimonials
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

    const testimonials = await query(
      `SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC`
    );

    return NextResponse.json({
      success: true,
      testimonials
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// CREATE testimonial
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

    const { title, videoId, displayOrder } = await request.json();

    if (!title || !videoId) {
      return NextResponse.json(
        { success: false, message: 'Title and Video ID are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO testimonials (title, video_id, display_order) 
       VALUES (?, ?, ?)`,
      [title, videoId, displayOrder || 0]
    );

    return NextResponse.json({
      success: true,
      message: 'Testimonial added successfully',
      testimonialId: result.insertId
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add testimonial' },
      { status: 500 }
    );
  }
}

// UPDATE testimonial
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

    const { id, title, videoId, displayOrder, isActive } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE testimonials SET title = ?, video_id = ?, display_order = ?, is_active = ? 
       WHERE id = ?`,
      [title, videoId, displayOrder || 0, isActive !== undefined ? isActive : true, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Testimonial updated successfully'
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE testimonial
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
        { success: false, message: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM testimonials WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}

