// Public API for fetching courses (no authentication required)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const courses = await query(
      `SELECT id, title, level, start_date, year, fee, image_url, category, connected, is_active 
       FROM courses 
       WHERE is_active = 1 
       ORDER BY created_at DESC`
    );

    return NextResponse.json({
      success: true,
      courses
    });
  } catch (error) {
    console.error('Get public courses error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

