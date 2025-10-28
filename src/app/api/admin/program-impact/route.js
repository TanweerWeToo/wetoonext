// Admin API for managing program impact metrics
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

    const { id, metricName, metricValue } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Metric ID is required' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE program_impact SET metric_name = ?, metric_value = ? 
       WHERE id = ?`,
      [metricName, metricValue, id]
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

