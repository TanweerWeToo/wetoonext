// Public API for fetching program impact metrics (no authentication required)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const metrics = await query(
      `SELECT id, title, value, description, display_order 
       FROM program_impact 
       ORDER BY display_order ASC`
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

