import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')

  // Prepare base response
  const response = NextResponse.redirect(new URL('/', origin))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          response.cookies.set({ name, value: '', ...options })
        }
      }
    }
  )

  // ✅ If we have code → exchange for session
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(new URL('/login', origin))
    }

    if (data.user) {

      // ✅ Fetch user role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      let redirectPath = '/login' // default after email confirmation

      if (profile?.role === 'admin') {
        redirectPath = '/admin'
      } else if (profile?.role === 'student') {
        redirectPath = '/my-dashboard'
      }

      return NextResponse.redirect(new URL(redirectPath, origin), {
        headers: response.headers
      })
    }
  }

  return response
}
