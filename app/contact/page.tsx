'use client'

import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  async function handleSubmit(e: any) {
    e.preventDefault()
    await supabase.from('enquiries').insert(form)
    alert('Message sent!')
  }

  return (
    <section className="px-12 py-16 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-primary">Contact Us</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input placeholder="Name" className="w-full p-3 border" />
        <input placeholder="Email" className="w-full p-3 border" />
        <textarea placeholder="Message" className="w-full p-3 border" />
        <button className="bg-primary text-white px-6 py-3 rounded">
          Send Message
        </button>
      </form>
    </section>
  )
}
