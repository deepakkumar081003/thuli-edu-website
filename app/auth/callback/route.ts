import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  // Default redirect
  let redirectUrl = new URL('/', req.url)

  const response = NextResponse.redirect(redirectUrl)

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

  if (code) {
    const { data } = await supabase.auth.exchangeCodeForSession(code)

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      let redirectPath = '/'

      if (profile?.role === 'admin') {
        redirectPath = '/admin'
      } else {
        redirectPath = '/my-dashboard'
      }

      return NextResponse.redirect(new URL(redirectPath, req.url), {
        headers: response.headers
      })

    }
  }

  return response
}
