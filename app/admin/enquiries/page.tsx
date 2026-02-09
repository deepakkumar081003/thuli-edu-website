'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useEffect, useState } from 'react'

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchEnquiries() {
    setLoading(true)
    const { data, error } = await supabaseBrowser
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setEnquiries(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchEnquiries()
  }, [])

  async function updateStatus(id: string, status: string) {
    const { error } = await supabaseBrowser
      .from('enquiries')
      .update({ status })
      .eq('id', id)

    if (!error) fetchEnquiries()
  }

  const statusColors: Record<string, string> = {
    Pending: 'bg-orange-100 text-orange-700',
    Completed: 'bg-green-100 text-green-700',
    Closed: 'bg-red-100 text-red-700',
  }

  const statusOptionColors: Record<string, string> = {
    Pending: 'text-orange-700',
    Completed: 'text-green-700',
    Closed: 'text-red-700',
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Enquiries
          </h1>
          <p className="text-yellow-400 text-lg">
            View and manage user enquiries
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-purple-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Source</th>
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
            ) : enquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No enquiries found
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-purple-50 transition">
                  <td className="px-6 py-4 text-purple-900 font-medium">{enquiry.name}</td>
                  <td className="px-6 py-4 text-purple-900">{enquiry.email}</td>
                  <td className="px-6 py-4 text-purple-900">{enquiry.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">{enquiry.message}</td>
                  <td className="px-6 py-4 text-gray-700">{enquiry.source}</td>

                  {/* Status Dropdown */}
                  <td className="px-6 py-4">
                    <select
                      value={enquiry.status}
                      onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold focus:ring-2 focus:ring-purple-500 ${statusColors[enquiry.status] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {['Pending', 'Completed', 'Closed'].map((status) => (
                        <option
                          key={status}
                          value={status}
                          className={`font-semibold ${statusOptionColors[status]}`}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-6 py-4 text-gray-700 text-sm">
                    {new Date(enquiry.created_at).toLocaleString()}
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
