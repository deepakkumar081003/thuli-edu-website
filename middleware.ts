import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          res.cookies.set({ name, value: '', ...options })
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

if (!user && req.nextUrl.pathname.startsWith('/my-dashboard')) {
  return NextResponse.redirect(new URL('/login', req.url))
}

if (!user && req.nextUrl.pathname.startsWith('/admin')) {
  return NextResponse.redirect(new URL('/login', req.url))
}

// If logged in, check role
if (user) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (req.nextUrl.pathname.startsWith('/admin') && profile?.role !== 'admin') {
    return NextResponse.redirect(new URL('/my-dashboard', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/my-dashboard') && profile?.role === 'admin') {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
}


  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth).*)'
  ]
}
