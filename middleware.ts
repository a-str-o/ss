import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    // Create a response object that we can modify
    const res = NextResponse.next();

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res });

    // Refresh session if expired - required for Server Components
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Middleware session error:', error);
      return res;
    }

    // Debug session state
    console.log('Current path:', req.nextUrl.pathname);
    console.log('Session exists:', !!session);

    // Handle protected routes
    if (!session) {
      // If the user is not logged in and trying to access protected routes
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const redirectUrl = new URL('/login', req.url);
        return NextResponse.redirect(redirectUrl);
      }
      // Allow access to public routes
      return res;
    }

    // Handle auth routes when logged in
    if (session) {
      // If trying to access login/register/root while logged in
      if (req.nextUrl.pathname === '/login' || 
          req.nextUrl.pathname === '/register' || 
          req.nextUrl.pathname === '/') {
        const redirectUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(redirectUrl);
      }
    }

    return res;
  } catch (e) {
    console.error('Middleware error:', e);
    return NextResponse.next();
  }
}

// Specify which routes this middleware should run for
export const config = {
  matcher: ['/', '/login', '/register', '/dashboard/:path*'],
};
