// Public API for fetching text testimonials (no authentication required)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await query(
      `SELECT id, name, subtitle, rating, testimonial, avatar_color 
       FROM text_testimonials 
       ORDER BY created_at DESC`
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

