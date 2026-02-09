'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useEffect, useState } from 'react'
import TuitionModal from './TuitionModal'
import DeleteModal from './DeleteModal'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'

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
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Tuitions
          </h1>
          <p className="text-yellow-400 text-lg">
            Manage tuition batches & schedules
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTuition(null)
            setShowModal(true)
          }}
          className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          + Add Tuition
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <p className="text-center text-gray-600 py-20">
          Loading tuitions...
        </p>
      ) : tuitions.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          No tuitions found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tuitions.map(t => (
            <div
              key={t.id}
              className="group bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl shadow-md hover:shadow-xl transition border border-purple-100"
            >
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-purple-900 truncate">
                  {t.title}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {t.class_level} • {t.subject}
                </p>

                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p><b>Mode:</b> {t.mode}</p>
                  <p><b>Timings:</b> {t.timings || '—'}</p>
                  <p><b>Fees:</b> ₹{t.fees}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      t.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {t.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingTuition(t)
                      setShowModal(true)
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:scale-105 transition"
                  >
                    <HiPencilAlt />
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteTuition(t)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:scale-105 transition"
                  >
                    <HiTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
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
