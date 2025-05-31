import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Only protect admin routes (but not login)
  if (request.nextUrl.pathname.startsWith('/admin') &&
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    const res = NextResponse.next();
    try {
      // Log all request cookies
      console.log('Request cookies:', request.cookies.getAll());
      // Initialize Supabase client with proper cookie handling
      const supabase = createMiddlewareClient({ req: request, res });
      // Refresh session cookie if needed
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('Session object:', session);
      console.log('Middleware session check:', !!session, error || '');
      if (error || !session) {
        console.log('Redirecting to login: no valid session');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      // Check admin role via user_roles table
      const userId = session.user.id;
      const { data: roles, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      console.log('Roles query result:', roles, 'Error:', roleError);
      if (roleError) {
        console.error('Error fetching user role:', roleError);
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      const isAdmin = Array.isArray(roles) && roles.some(r => r.role === 'admin');
      console.log('Middleware admin role check:', isAdmin);
      if (!isAdmin) {
        console.log('Redirecting to login: user is not admin');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      // Allow access if admin
      return res;
    } catch (err) {
      console.error('Middleware error:', err);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  // For non-admin routes or login page, pass through
  return NextResponse.next();
}

// Apply middleware to admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
