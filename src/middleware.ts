import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const isAuthenticated = Boolean(session);
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith('/dashboard');
  const isLoginPage = pathname === '/login';

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users away from the login page
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
