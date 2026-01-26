import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // --- 1. ADMIN AUTHENTICATION CHECK ---
  
  // Define protected paths
  const isAdminPath = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  
  // Check for session cookie
  const isAdminAuthenticated = request.cookies.has('admin_session');

  // Case 1: Trying to access Admin Panel WITHOUT valid session
  if (isAdminPath && !isLoginPage && !isAdminAuthenticated) {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // Case 2: Trying to access Login Page WITH valid session (Redirect to Dashboard)
  if (isLoginPage && isAdminAuthenticated) {
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  // --- 2. EXISTING REDIRECTS (HTTPS & WWW) ---
  const host = request.headers.get('host') || '';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';

  // If the request is HTTP, redirect to HTTPS (Production only)
  if (protocol === 'http' && process.env.NODE_ENV === 'production') {
    url.protocol = 'https:';
    url.host = host;
    return NextResponse.redirect(url, 301);
  }

  // Force non-www
  if (host.startsWith('www.')) {
    url.host = host.replace('www.', '');
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes except our specific login route needs to be accessible, but usually middleware runs before API routes too depending on config. Next.js middleware matchers often exclude api by default in templates, but here we want to protect pages.)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
