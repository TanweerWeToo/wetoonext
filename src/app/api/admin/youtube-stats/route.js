// YouTube Stats API Route
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET YouTube stats
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

    const stats = await query('SELECT * FROM youtube_stats LIMIT 1');

    return NextResponse.json({
      success: true,
      stats: stats[0] || null
    });
  } catch (error) {
    console.error('Get YouTube stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch YouTube stats' },
      { status: 500 }
    );
  }
}

// UPDATE YouTube stats
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

    const { subscribers, totalViews, videosCount, highestSingleVideoViews } = await request.json();

    if (!subscribers || !totalViews || !videosCount || !highestSingleVideoViews) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if entry exists
    const existing = await query('SELECT id FROM youtube_stats LIMIT 1');

    if (existing.length > 0) {
      // Update existing entry
      await query(
        `UPDATE youtube_stats SET 
         subscribers = ?, 
         total_views = ?, 
         videos_count = ?, 
         highest_single_video_views = ? 
         WHERE id = ?`,
        [subscribers, totalViews, videosCount, highestSingleVideoViews, existing[0].id]
      );
    } else {
      // Insert new entry
      await query(
        `INSERT INTO youtube_stats 
         (subscribers, total_views, videos_count, highest_single_video_views) 
         VALUES (?, ?, ?, ?)`,
        [subscribers, totalViews, videosCount, highestSingleVideoViews]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'YouTube stats updated successfully'
    });
  } catch (error) {
    console.error('Update YouTube stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update YouTube stats' },
      { status: 500 }
    );
  }
}

