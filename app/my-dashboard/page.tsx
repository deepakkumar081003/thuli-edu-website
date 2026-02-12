'use client'

import Link from 'next/link'
import {
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineDesktopComputer,
  HiOutlineCreditCard 
} from 'react-icons/hi'
import { useAuth } from '@/context/AuthContext'

export default function MyDashboard() {
  const { profile } = useAuth()

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">
      
      {/* Header */}
      <div className="mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-3">
          My Dashboard
        </h1>
        <p className="text-yellow-400 text-xl">
          Welcome back, {profile?.full_name || 'Student'} 👋
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* My Courses */}
        <Link
          href="/my-dashboard/my-courses"
          className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
        >
          <div className="bg-purple-900 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
            <HiOutlineBookOpen />
          </div>
          <h2 className="text-2xl font-semibold text-purple-900 mb-2">
            My Courses
          </h2>
          <p className="text-gray-600">
            View your purchased courses
          </p>
        </Link>

        {/* My Tuitions */}
        <Link
          href="/my-dashboard/my-tuitions"
          className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
        >
          <div className="bg-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
            <HiOutlineClipboardList />
          </div>
          <h2 className="text-2xl font-semibold text-purple-900 mb-2">
            My Tuitions
          </h2>
          <p className="text-gray-600">
            View enrolled tuition batches
          </p>
        </Link>

        {/* My Solutions */}
        <Link
          href="/my-dashboard/my-solutions"
          className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
        >
          <div className="bg-yellow-400 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
            <HiOutlineDesktopComputer />
          </div>
          <h2 className="text-2xl font-semibold text-purple-900 mb-2">
            My Solutions
          </h2>
          <p className="text-gray-600">
            View purchased software/services
          </p>
        </Link>

        {/* My Payments */}
        <Link
          href="/my-dashboard/my-payments"
          className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
        >
          <div className="bg-green-600 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
            <HiOutlineCreditCard />
          </div>
          <h2 className="text-2xl font-semibold text-purple-900 mb-2">
            My Payments
          </h2>
          <p className="text-gray-600">
            View all your transactions
          </p>
        </Link>


      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-300 opacity-10 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-400 opacity-10 rounded-full"></div>

    </section>
  )
}
