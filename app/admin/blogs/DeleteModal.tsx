'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function DeleteModal({ blog, onClose, onDeleted }: any) {
  async function handleDelete() {
    const { error } = await supabaseBrowser
      .from('blogs')
      .delete()
      .eq('id', blog.id)

    if (error) {
      alert(error.message)
      return
    }

    onDeleted()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">
          Delete Blog
        </h2>

        <p>
          Are you sure you want to delete{' '}
          <b>{blog.title}</b>?
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
