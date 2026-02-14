'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function MyCourses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchCourses = async () => {
      const { data, error } = await supabaseBrowser
        .from('registrations')
        .select(`
          id,
          status,
          products (
            id,
            title,
            slug,
            image_url,
            price,
            categories (
              id,
              name
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .eq('products.categories.name', 'Course')

      if (!error) {
        setCourses(data)
      }

      setLoading(false)
    }

    fetchCourses()
  }, [user])

  if (loading)
    return (
      <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <p className="text-purple-700 font-semibold text-lg">Loading...</p>
      </div>
    )

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">

      {/* Header */}
      <div className="mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-3">
          My Courses
        </h1>
        <p className="text-yellow-400 text-lg">
          Access all your purchased courses here
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-xl">
          <p className="text-gray-600 text-lg">
            You haven’t purchased any courses yet.
          </p>

          <Link
            href="/products"
            className="inline-block mt-6 bg-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-purple-700 hover:scale-105 transition duration-300"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.products?.slug}`}
              className="group block bg-white rounded-3xl shadow-xl border border-purple-100 p-6 hover:shadow-2xl transition hover:-translate-y-1"
            >
              <img
                src={item.products?.image_url || '/placeholder.jpg'}
                alt={item.products?.title}
                className="h-56 w-full object-cover rounded-2xl"
              />

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-purple-900">
                  {item.products?.title}
                </h2>

                <p className="text-sm text-green-600 font-semibold mt-3">
                  ✅ Purchased
                </p>

                <span className="inline-block mt-4 text-purple-700 font-medium group-hover:underline">
                  View Course →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Decorative blobs (same as dashboard) */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-300 opacity-10 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-400 opacity-10 rounded-full"></div>

    </section>
  )
}
