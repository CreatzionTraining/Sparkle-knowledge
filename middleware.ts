import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Force HTTPS redirect
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';

  // If the request is HTTP, redirect to HTTPS
  if (protocol === 'http' && process.env.NODE_ENV === 'production') {
    url.protocol = 'https:';
    url.host = host;
    return NextResponse.redirect(url, 301); // Permanent redirect
  }

  // Force www or non-www (choose one - this example forces non-www)
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
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
