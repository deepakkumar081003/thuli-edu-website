'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSignup(e: any) {
    e.preventDefault()

    const { data, error } = await supabaseBrowser.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    alert('Signup successful! You can login now.')
    router.push('/login')
  }

  return (
    <section className="px-12 py-16 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-primary">Admin Signup</h2>

      <form onSubmit={handleSignup} className="mt-6 space-y-4">
        <input
          type="email"
          className="w-full p-3 border"
          placeholder="Email"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 border"
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-primary text-white px-6 py-3 w-full rounded">
          Signup
        </button>
      </form>
    </section>
  )
}
