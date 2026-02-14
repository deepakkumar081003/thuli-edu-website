'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false) // State to toggle forgot password flow
  const [resetEmailSent, setResetEmailSent] = useState(false) // State to show email sent message
  const router = useRouter()

  const handleGoogleLogin = async () => {
    await supabaseBrowser.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account'
        }
      }
    })
  }

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
      router.replace('/my-dashboard')
    }
  }

  /// Function to trigger password reset email
  const handleForgotPassword = async () => {
    setLoading(true)
    console.log("Sending password reset email for:", email)  // Log the email

    // Triggering the password reset email
    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/reset-password`, // Redirect to your reset page
    })

    setLoading(false)

    // Log the result of the email sending process
    if (error) {
      console.error('Error sending reset email:', error)
      alert('Error sending reset email: ' + error.message)
      return
    }

    // If no error, confirm the email was sent
    setResetEmailSent(true)
    console.log("Password reset email sent successfully.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 flex items-center justify-center px-6 py-2">

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10  overflow-hidden">

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

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-4 rounded-xl shadow hover:bg-gray-50 transition disabled:opacity-60"
        >
          <FcGoogle className="text-xl" />
          <span className="ml-2">Continue with Google</span>
          
          {/* Recommended Badge */}
          <span className="ml-2 text-xs text-white bg-green-500 rounded-full px-2 py-1">Recommended</span>
        </button>

        {/* OR separator */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-600">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email Sign-in Form */}
        {!forgotPassword ? (
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

            {/* Forgot Password Link */}
            {!forgotPassword && (
              <div className="text-center text-sm text-gray-600 mt-2">
                <button
                  type="button"
                  onClick={() => setForgotPassword(true)}
                  className="text-purple-700 hover:underline"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-5 relative z-10">
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>

            {resetEmailSent && (
              <div className="text-green-500 text-center mt-4">
                <p>Check your inbox for a reset link!</p>
              </div>
            )}
          </form>
        )}

        {/* Register Link */}
        <div className="text-center my-4">
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
