// Admin API for managing program impact metrics (4 fixed entries)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET all program impact metrics
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

    const metrics = await query(
      `SELECT * FROM program_impact ORDER BY display_order ASC`
    );

    return NextResponse.json({
      success: true,
      metrics
    });
  } catch (error) {
    console.error('Get program impact error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

// UPDATE program impact metric
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

    const { id, title, value, description } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Metric ID is required' },
        { status: 400 }
      );
    }

    // Ensure we only update one of the 4 fixed entries
    if (id < 1 || id > 4) {
      return NextResponse.json(
        { success: false, message: 'Invalid metric ID. Only IDs 1-4 are allowed.' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE program_impact SET title = ?, value = ?, description = ? 
       WHERE id = ?`,
      [title, value, description || '', id]
    );

    return NextResponse.json({
      success: true,
      message: 'Metric updated successfully'
    });
  } catch (error) {
    console.error('Update program impact error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update metric' },
      { status: 500 }
    );
  }
}

