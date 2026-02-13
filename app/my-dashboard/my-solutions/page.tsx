'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function MySolutions() {
  const { user } = useAuth()
  const [solutions, setSolutions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchSolutions = async () => {
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
        .in('products.categories.name', [
          'Software',
          'Website',
          'Digital Marketing',
          'App Development'
        ])

      if (!error) {
        setSolutions(data)
      }

      setLoading(false)
    }

    fetchSolutions()
  }, [user])

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-8 py-30">
      <h1 className="text-2xl font-bold mb-6">My Solutions</h1>

      {solutions.length === 0 ? (
        <p>No solutions purchased yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow">
              <img
                src={item.products?.image_url}
                alt={item.products?.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-3 font-semibold">
                {item.products?.title}
              </h2>

              <Link
                href={`/products/${item.products?.slug}`}
                className="text-purple-600 text-sm mt-2 inline-block"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
