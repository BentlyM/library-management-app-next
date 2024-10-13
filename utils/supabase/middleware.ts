import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({request})

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirects
  if (!user && request.nextUrl.pathname === '/dashboard') {
    const url = request.nextUrl.clone()
    url.pathname = '/' // Change to landing page
    return NextResponse.redirect(url)
  }

  // Allow access to login and register pages
  if (!user && !request.nextUrl.pathname.startsWith('/auth/login') && !request.nextUrl.pathname.startsWith('/register') && !request.nextUrl.pathname.startsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = '/' // Redirect to landing page for other routes
    return NextResponse.redirect(url)
  }

  // Return the supabaseResponse, making sure to keep the cookies intact
  return supabaseResponse
}
