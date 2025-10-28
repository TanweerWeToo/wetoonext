// Admin Logout API Route
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
  try {
    // Clear the cookie
    const cookie = serialize('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Logout successful',
    });

    response.headers.set('Set-Cookie', cookie);
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

