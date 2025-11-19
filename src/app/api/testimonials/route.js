// Public API for fetching testimonials (no authentication required)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await query(
      `SELECT id, title, video_id, video_url, display_order 
       FROM testimonials 
       WHERE is_active = 1
       ORDER BY display_order ASC, created_at DESC`
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

