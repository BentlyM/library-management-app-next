import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect if the user is authenticated and accessing the login page
  if (
    (user && request.nextUrl.pathname === '/login') ||
    (user && request.nextUrl.pathname === '/register')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard'; // Redirect to dashboard
    return NextResponse.redirect(url);
  }

  // Redirects for unauthenticated users
  if (!user) {
    // Check if the requested path is protected
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      const url = request.nextUrl.clone();
      url.pathname = '/'; // Redirect to landing page
      return NextResponse.redirect(url);
    }

    // Allow access to login and register pages
    if (
      !request.nextUrl.pathname.startsWith('/')
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/'; // Redirect to landing page for other routes
      return NextResponse.redirect(url);
    }
  }

  // Return the supabaseResponse, making sure to keep the cookies intact
  return supabaseResponse;
}
