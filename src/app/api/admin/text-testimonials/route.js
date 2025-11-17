// Text Testimonials API Route (GET, POST)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET all text testimonials
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
      `SELECT * FROM text_testimonials ORDER BY created_at DESC`
    );

    return NextResponse.json({
      success: true,
      testimonials
    });
  } catch (error) {
    console.error('Get text testimonials error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// CREATE new text testimonial
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

    const { name, subtitle, rating, testimonial, avatarColor } = await request.json();

    if (!name || !rating || !testimonial) {
      return NextResponse.json(
        { success: false, message: 'Name, rating, and testimonial are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO text_testimonials 
       (name, subtitle, rating, testimonial, avatar_color) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, subtitle || '', rating, testimonial, avatarColor || '#3B82F6']
    );

    return NextResponse.json({
      success: true,
      message: 'Testimonial created successfully',
      testimonialId: result.insertId
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}

// UPDATE text testimonial
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

    const { id, name, subtitle, rating, testimonial, avatarColor } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE text_testimonials 
       SET name = ?, subtitle = ?, rating = ?, testimonial = ?, avatar_color = ? 
       WHERE id = ?`,
      [name, subtitle || '', rating, testimonial, avatarColor || '#3B82F6', id]
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

// DELETE text testimonial
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

    await query('DELETE FROM text_testimonials WHERE id = ?', [id]);

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

