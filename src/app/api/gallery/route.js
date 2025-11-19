// Public API for fetching gallery images (no authentication required)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const images = await query(
      `SELECT id, image_url, caption, display_order 
       FROM gallery 
       ORDER BY display_order ASC, uploaded_at DESC`
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

