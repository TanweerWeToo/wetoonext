// Middleware to protect admin routes
import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Check if the path is an admin route
  const isAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login');
  const isAdminApiRoute = path.startsWith('/api/admin') && !path.startsWith('/api/admin/auth');

  // Get token from cookies
  const token = request.cookies.get('admin_token')?.value;

  // Redirect to login if accessing admin routes without token
  if ((isAdminRoute || isAdminApiRoute) && !token) {
    if (isAdminApiRoute) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Redirect to dashboard if accessing login with valid token
  if (path === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

