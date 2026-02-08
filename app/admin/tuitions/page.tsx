'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useEffect, useState } from 'react'
import TuitionModal from './TuitionModal'
import DeleteModal from './DeleteModal'

export default function AdminTuitions() {
  const [tuitions, setTuitions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [editingTuition, setEditingTuition] = useState<any>(null)

  const [deleteTuition, setDeleteTuition] = useState<any>(null)

  async function fetchTuitions() {
    setLoading(true)

    const { data, error } = await supabaseBrowser
      .from('tuitions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setTuitions(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchTuitions()
  }, [])

  return (
    <section className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tuitions</h1>

        <button
          onClick={() => {
            setEditingTuition(null)
            setShowModal(true)
          }}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + Add Tuition
        </button>
      </div>

      {loading ? (
        <p className="mt-6">Loading...</p>
      ) : (
        <table className="mt-6 w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Class</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Mode</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tuitions.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.title}</td>
                <td className="p-3">{t.class_level}</td>
                <td className="p-3">{t.subject}</td>
                <td className="p-3">{t.mode}</td>
                <td className="p-3">₹{t.fees}</td>
                <td className="p-3">
                  {t.is_active ? 'Yes' : 'No'}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditingTuition(t)
                      setShowModal(true)
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteTuition(t)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <TuitionModal
          tuition={editingTuition}
          onClose={() => setShowModal(false)}
          onSaved={fetchTuitions}
        />
      )}

      {deleteTuition && (
        <DeleteModal
          tuition={deleteTuition}
          onClose={() => setDeleteTuition(null)}
          onDeleted={fetchTuitions}
        />
      )}
    </section>
  )
}
