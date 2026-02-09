'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function DeleteTuitionModal({
  tuition,
  onClose,
  onDeleted,
}: any) {
  async function handleDelete() {
    const { error } = await supabaseBrowser
      .from('tuitions')
      .delete()
      .eq('id', tuition.id)

    if (error) {
      alert(error.message)
      return
    }

    onDeleted()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-red-600">
            Delete Tuition
          </h2>
          <p className="text-gray-600 mt-1">
            This action cannot be undone
          </p>
        </div>

        {/* Message */}
        <p className="text-gray-700">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-purple-900">
            {tuition.title}
          </span>
          ?
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Delete Tuition
          </button>
        </div>
      </div>
    </div>
  )
}
