// Public API for fetching YouTube stats (no authentication required)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const stats = await query('SELECT * FROM youtube_stats LIMIT 1');

    if (stats.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No YouTube stats found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      stats: stats[0]
    });
  } catch (error) {
    console.error('Get YouTube stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch YouTube stats' },
      { status: 500 }
    );
  }
}

