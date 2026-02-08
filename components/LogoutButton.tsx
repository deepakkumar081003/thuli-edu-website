'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await supabaseBrowser.auth.signOut()
    router.replace('/login')
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? 'Logging out…' : 'Logout'}
    </button>
  )
}
