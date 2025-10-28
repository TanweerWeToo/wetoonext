// Admin API for managing courses
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET all courses
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

    const courses = await query(
      `SELECT * FROM courses ORDER BY created_at DESC`
    );

    return NextResponse.json({
      success: true,
      courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// CREATE course
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

    const { title, level, startDate, year, fee, imageUrl, category } = await request.json();

    if (!title || !level || !category) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO courses (title, level, start_date, year, fee, image_url, category) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, level, startDate, year, fee, imageUrl, category]
    );

    return NextResponse.json({
      success: true,
      message: 'Course created successfully',
      courseId: result.insertId
    });
  } catch (error) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create course' },
      { status: 500 }
    );
  }
}

// UPDATE course
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

    const { id, title, level, startDate, year, fee, imageUrl, category, isActive } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Course ID is required' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE courses SET title = ?, level = ?, start_date = ?, year = ?, fee = ?, image_url = ?, category = ?, is_active = ? 
       WHERE id = ?`,
      [title, level, startDate, year, fee, imageUrl, category, isActive !== undefined ? isActive : true, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Update course error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE course
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
        { success: false, message: 'Course ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM courses WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete course' },
      { status: 500 }
    );
  }
}

