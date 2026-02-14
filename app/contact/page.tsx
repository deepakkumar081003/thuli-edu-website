'use client'

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiChevronDown } from 'react-icons/hi'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
    enquiryType: '',
    enquiryItem: '',
  })

  const [products, setProducts] = useState<any[]>([])
  const [tuitions, setTuitions] = useState<any[]>([])

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    async function loadData() {
      const { data: productsData } = await supabase
        .from('products')
        .select('id,title,category_id,categories(name)')
        .eq('is_active', true)

      const { data: tuitionsData } = await supabase
        .from('tuitions')
        .select('id,title')
        .eq('is_active', true)

      setProducts(productsData || [])
      setTuitions(tuitionsData || [])
    }

    loadData()
  }, [])

  /* ---------------- HELPERS ---------------- */
  function filteredOptions() {
    if (form.enquiryType === 'course') {
      return products.filter(p => p.categories?.name === 'Course')
    }

    if (form.enquiryType === 'solutions') {
      return products.filter(p => p.categories?.name !== 'Course')
    }

    if (form.enquiryType === 'tuitions') {
      return tuitions
    }

    return []
  }

  /* ---------------- INSERT ENQUIRY ---------------- */
async function insertEnquiry() {
  try {
    const sourceValue = form.enquiryType
      ? `${form.enquiryType} - ${form.enquiryItem || 'Other'}`
      : 'Other'

    const { data, error } = await supabase.from('enquiries').insert({
      name: form.name ,
      email: form.email || 'Not provided',  // <-- must NOT be null
      phone: form.mobile,
      message: form.message || 'No message',
      source: form.enquiryType
        ? `${form.enquiryType} - ${form.enquiryItem || 'Other'}`
        : 'Other',
      status: 'Pending',
    })


    if (error) {
      console.error('Supabase insert error:', error)
    } else {
      console.log('Inserted enquiry:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}



 /* ---------------- SUBMIT EMAIL ---------------- */
async function handleSubmit(e: any) {
  e.preventDefault()

  // Insert into DB
  await insertEnquiry()

  alert('Message sent successfully!')
  resetForm()
}

  /* ---------------- WHATSAPP ---------------- */
async function handleWhatsApp() {
  // Insert into DB first
  await insertEnquiry()

  // WhatsApp message
  const text = `
Hi Thuli Team! I want to enquire about ${form.enquiryType} - ${form.enquiryItem || 'Other'}.
Name: ${form.name}
Mobile: ${form.mobile}
Email: ${form.email || 'Not provided'}
Message: ${form.message}
  `.trim()

  const url = `https://wa.me/917092097170?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')

  // Optional: reset form
  resetForm()
}

  function resetForm() {
    setForm({
      name: '',
      mobile: '',
      email: '',
      message: '',
      enquiryType: '',
      enquiryItem: '',
    })
  }

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="px-16 md:px-32 py-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">

        {/* grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-yellow-400 font-semibold text-lg mb-3">
            Let’s Talk
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-900 leading-tight">
            Get in Touch With Us
          </h1>

          <p className="mt-6 text-lg text-purple-900 max-w-2xl mx-auto">
            Have questions about courses, tuitions, or solutions?  
            We’re happy to help you choose the right path.
          </p>
        </div>

        {/* accents */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 opacity-20 rotate-12 rounded-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 opacity-15 -rotate-12 rounded-3xl"></div>
      </section>

      {/* ================= CONTACT CONTENT ================= */}
      <section className="px-12 md:px-32 py-20">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2">

          {/* LEFT INFO */}
<div className="flex flex-col justify-between h-full">

  {/* Top Content */}
  <div>
    <h2 className="text-4xl font-bold text-purple-900 mb-4">
      Let’s Build Your Next Step 🚀
    </h2>

    <p className="text-purple-900 text-lg leading-relaxed mb-8">
      Whether you're looking to <b>learn practical tech skills</b>,
      <b> build real-world solutions</b>, or get
      <b> personalised academic guidance</b>,
      THULI is here to support you at every stage.
    </p>

    {/* Feature Blocks */}
    <div className="space-y-5">
      <div className="flex gap-4 items-start">
        <div className="bg-purple-100 p-3 rounded-xl text-purple-700">
          🎓
        </div>
        <div>
          <h4 className="font-semibold text-purple-900">Industry-Focused Courses</h4>
          <p className="text-purple-800 text-sm">
            Learn by building real projects using modern tools and technologies.
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="bg-indigo-100 p-3 rounded-xl text-indigo-700">
          💻
        </div>
        <div>
          <h4 className="font-semibold text-purple-900">Tech Solutions</h4>
          <p className="text-purple-800 text-sm">
            Websites, software, digital marketing and custom solutions for businesses.
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="bg-yellow-100 p-3 rounded-xl text-yellow-700">
          📘
        </div>
        <div>
          <h4 className="font-semibold text-purple-900">Personalised Tuitions</h4>
          <p className="text-purple-800 text-sm">
            One-to-one guidance for school and college students.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Contact Info Box */}
  <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
    <h4 className="font-semibold text-purple-900 mb-4">
      Reach us directly
    </h4>

    <div className="space-y-4 text-purple-900">
      <div className="flex items-center gap-4">
        <div className="bg-white p-3 rounded-xl text-purple-700 text-xl shadow-sm">
          <HiMail />
        </div>
        <span>contact@thuli.in</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white p-3 rounded-xl text-purple-700 text-xl shadow-sm">
          <HiPhone />
        </div>
        <span>+91 70920 97170</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white p-3 rounded-xl text-purple-700 text-xl shadow-sm">
          <HiLocationMarker />
        </div>
        <span>India</span>
      </div>
    </div>

    <p className="mt-5 text-sm text-purple-700">
      💡 <b>Tip:</b> WhatsApp messaging is the fastest way to get a response.
    </p>
  </div>
</div>


          {/* RIGHT FORM */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-purple-900 mb-6">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                required
                placeholder="Your Name"
                className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-purple-500"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />

              <input
                required
                placeholder="Mobile Number"
                className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-purple-500"
                value={form.mobile}
                onChange={e => setForm({ ...form, mobile: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email (optional)"
                className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-purple-500"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />

              {/* ================= Enquiry Type Listbox ================= */}
<Listbox value={form.enquiryType} onChange={(val) => setForm({ ...form, enquiryType: val, enquiryItem: '' })}>
  <div className="relative">
    <Listbox.Button className="w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-900 text-base flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
      {form.enquiryType || 'Select Enquiry Type'}
      <HiChevronDown className="w-5 h-5 text-gray-500" />
    </Listbox.Button>
    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
      <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none z-50">
        <Listbox.Option value="course" className={({ active }) => `cursor-pointer select-none relative py-2 px-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
          Course
        </Listbox.Option>
        <Listbox.Option value="solutions" className={({ active }) => `cursor-pointer select-none relative py-2 px-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
          Solutions
        </Listbox.Option>
        <Listbox.Option value="tuitions" className={({ active }) => `cursor-pointer select-none relative py-2 px-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
          Tuitions
        </Listbox.Option>
      </Listbox.Options>
    </Transition>
  </div>
</Listbox>

{/* ================= Conditional Dropdown (Enquiry Item) ================= */}
{form.enquiryType && (
  <Listbox value={form.enquiryItem} onChange={(val) => setForm({ ...form, enquiryItem: val })}>
    <div className="relative mt-2">
      <Listbox.Button className="w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-900 text-base flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
        {form.enquiryItem || 'Select Option'}
        <HiChevronDown className="w-5 h-5 text-gray-500" />
      </Listbox.Button>
      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
        <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none z-50">
          {filteredOptions().map((item: any) => (
            <Listbox.Option key={item.id} value={item.title} className={({ active }) => `cursor-pointer select-none relative py-2 px-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
              {item.title}
            </Listbox.Option>
          ))}
          <Listbox.Option value="Other" className={({ active }) => `cursor-pointer select-none relative py-2 px-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
            Other
          </Listbox.Option>
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
)}


              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-purple-500"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />

              {/* ACTION BUTTONS */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-105 transition"
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="bg-green-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-105 transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-xl" />
                  Whatsapp (Faster)
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-12 md:px-32 py-24 bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Ready to Start Learning?
          </h2>

          <p className="mt-4 text-purple-100">
            Join our courses or personalized tuitions and grow with confidence.
          </p>

          <Link
            href="/products"
            className="inline-block mt-10 px-10 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-100 transition"
          >
            View Programs
          </Link>
        </div>
      </section>

    </div>
  )
}
