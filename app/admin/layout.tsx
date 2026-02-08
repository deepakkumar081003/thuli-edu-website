import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function AdminLayout({
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
        get(name) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/unauthorized')
  }

  return <>{children}</>
}
