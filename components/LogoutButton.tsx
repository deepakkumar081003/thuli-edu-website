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
      className="block md:inline-block px-4 py-2 text-white hover:text-yellow-400 transition-colors disabled:opacity-50"
    >
      {loading ? 'Logging out…' : 'Logout'}
    </button>
  )
}
