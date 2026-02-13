'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the 'code' from the URL query parameter (supabase sends this as 'code')
  const resetCode = searchParams.get('code')

  console.log('Reset Code:', resetCode)

  if (!resetCode) {
    // If no reset code is available, show an error
    return <div>Error: Invalid password reset link</div>
  }

  // Handle Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    // Here, we use the `supabase.auth.updateUser` directly to change the password
    const { error } = await supabaseBrowser.auth.updateUser({
      password, // New password
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push('/login') // Redirect to login page after successful password reset
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 flex items-center justify-center px-6">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 overflow-hidden">
        <h2 className="text-3xl font-bold text-purple-900 mb-4 text-center">
          Reset Your Password
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Password reset successful! Redirecting...</p>}

        {/* Reset Password Form */}
        <form onSubmit={handleResetPassword} className="space-y-5 relative z-10">
          <input
            type="password"
            placeholder="New Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
          >
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
