'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useAuth } from '@/context/AuthContext'

export default function MyPayments() {
  const { user } = useAuth()
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchPayments = async () => {
      const { data, error } = await supabaseBrowser
        .from('registrations')
        .select(`
          id,
          status,
          amount_paid,
          payment_status,
          razorpay_payment_id,
          created_at,
          products (
            title
          ),
          tuitions (
            title
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error) {
        setPayments(data || [])
      }

      setLoading(false)
    }

    fetchPayments()
  }, [user])

  if (loading) return <p className="p-10">Loading payments...</p>

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-20">

      <h1 className="text-4xl font-bold text-purple-900 mb-10">
        My Payments
      </h1>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="space-y-6">
          {payments.map((payment) => {
            const itemTitle =
              payment.products?.title ||
              payment.tuitions?.title ||
              'Unknown Item'

            const itemType = payment.products
              ? 'Product'
              : payment.tuitions
              ? 'Tuition'
              : 'Other'

            return (
              <div
                key={payment.id}
                className="bg-white rounded-2xl shadow-md p-6 border border-purple-100"
              >
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-purple-900">
                      {itemTitle}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Type: {itemType}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ₹{payment.amount_paid || 0}
                    </p>

                    <p
                      className={`text-sm font-semibold ${
                        payment.payment_status === 'success'
                          ? 'text-green-600'
                          : 'text-red-500'
                      }`}
                    >
                      {payment.payment_status || payment.status}
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Payment ID:</strong>{' '}
                    {payment.razorpay_payment_id || 'N/A'}
                  </p>
                  <p>
                    <strong>Date:</strong>{' '}
                    {new Date(payment.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
