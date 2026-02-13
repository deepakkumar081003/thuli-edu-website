'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useEffect, useState } from 'react'

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Function to fetch registrations from the database
  async function fetchRegistrations() {
    console.log("Inside fetchRegistrations...");  // Debugging line
    
    setLoading(true);
    console.log("Fetching registrations...");
    
    const { data, error } = await supabaseBrowser
      .from('registrations')
      .select('id, user_id, product_id, tuition_id, status, amount_paid, razorpay_order_id, razorpay_payment_id, payment_status, created_at')
      .order('created_at', { ascending: false });

    // Log and handle errors if any
    if (error) {
      console.error('Error fetching registrations:', error.message);
      setLoading(false);
      return;
    }

    console.log('Registrations fetched:', data);
    
    if (data && data.length === 0) {
      console.log("No registrations found.");
    }
    
    setRegistrations(data || []);
    setLoading(false);
  }

  useEffect(() => {
    console.log("Fetching registrations in useEffect...");
    fetchRegistrations();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Status color mapping
  const statusColors: Record<string, string> = {
    pending: 'bg-orange-100 text-orange-700',
    paid: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  const statusOptionColors: Record<string, string> = {
    pending: 'text-orange-700',
    paid: 'text-green-700',
    cancelled: 'text-red-700',
  }

  console.log('Registrations state:', registrations); // Debugging line

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Registrations
          </h1>
          <p className="text-yellow-400 text-lg">
            View and manage user registrations
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-purple-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Tuition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Amount Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Payment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Created At</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No registrations found
                </td>
              </tr>
            ) : (
              registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-purple-50 transition">
                  <td className="px-6 py-4 text-purple-900 font-medium">{registration.user_id}</td>
                  <td className="px-6 py-4 text-purple-900">{registration.product_id}</td>
                  <td className="px-6 py-4 text-purple-900">{registration.tuition_id}</td>
                  <td className="px-6 py-4 text-purple-900">{registration.amount_paid}</td>
                  <td className="px-6 py-4 text-gray-700">{registration.payment_status}</td>

                  {/* Status Display */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[registration.status] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {registration.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-700 text-sm">
                    {new Date(registration.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
