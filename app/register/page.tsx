'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert('Registration successful 🎉')
    router.push('/login')
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-6">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-purple-100">
        
        {/* Title */}
        <h2 className="text-4xl font-bold text-purple-900 text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-yellow-400 mb-8">
          Join THULI and start learning 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            required
            onChange={e => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={e => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}
