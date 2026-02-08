'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password
    })

    if (error || !data.user) {
      setLoading(false)
      alert(error?.message || 'Login failed')
      return
    }

    // ✅ Fetch role AFTER login
    const { data: profile, error: profileError } = await supabaseBrowser
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    setLoading(false)

    if (profileError || !profile) {
      alert('Profile not found')
      return
    }

    // ✅ Correct redirect
    if (profile.role === 'admin') {
      router.replace('/admin')
    } else {
      router.replace('/')
    }
  }

  return (
    <section className="px-12 py-16 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-primary">Login</h2>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border"
          required
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border"
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-primary text-white px-6 py-3 w-full rounded disabled:opacity-60"
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </section>
  )
}
