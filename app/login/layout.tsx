import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: name => cookieStore.get(name)?.value
      }
    }
  )

  const {
    data: { user }
  } = await supabase.auth.getUser()

  // ✅ Already logged in → block login page
  if (user) {
    redirect('/')
  }

  return <>{children}</>
}
