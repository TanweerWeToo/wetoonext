// Admin API for managing applications
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET all applications
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

    const applications = await query(
      `SELECT * FROM applications ORDER BY submitted_at DESC`
    );

    return NextResponse.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// UPDATE application
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

    const { id, status, paid } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    let updateQuery = 'UPDATE applications SET';
    const params = [];
    
    if (status !== undefined) {
      updateQuery += ' status = ?';
      params.push(status);
    }
    
    if (paid !== undefined) {
      if (params.length > 0) updateQuery += ',';
      updateQuery += ' paid = ?';
      params.push(paid);
    }
    
    updateQuery += ' WHERE id = ?';
    params.push(id);

    await query(updateQuery, params);

    return NextResponse.json({
      success: true,
      message: 'Application updated successfully'
    });
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE application
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
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM applications WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete application' },
      { status: 500 }
    );
  }
}

