'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleRegister(e: any) {
    e.preventDefault()

    const { error } = await supabaseBrowser.auth.signUp({
      email,
      password
    })

    if (!error) {
      alert('Registration successful')
      router.push('/login')
    }
  }

  return (
    <section className="px-12 py-16 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-primary">Register</h2>

      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border"
        />
        <button className="bg-accent px-6 py-3 w-full rounded font-semibold">
          Create Account
        </button>
      </form>
    </section>
  )
}
