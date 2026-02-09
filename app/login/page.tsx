'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
      password,
    })

    if (error || !data.user) {
      setLoading(false)
      alert(error?.message || 'Login failed')
      return
    }

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

    if (profile.role === 'admin') {
      router.replace('/admin')
    } else {
      router.replace('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 flex items-center justify-center px-6">

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 overflow-hidden">

        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-900 rounded-full opacity-10"></div>

        <div className="relative z-10 text-center">
          <p className="text-yellow-400 font-semibold mb-2">
            Welcome Back 👋
          </p>

          <h2 className="text-3xl font-bold text-purple-900 mb-2">
            Login to Your Account
          </h2>

          <p className="text-gray-600 mb-8">
            Continue learning and building real-world projects
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <input
            type="email"
            placeholder="Email address"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <div className="relative z-10 text-center mt-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link href="/register" className="text-purple-700 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
