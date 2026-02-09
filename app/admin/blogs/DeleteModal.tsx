'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function DeleteBlogModal({
  blog,
  onClose,
  onDeleted,
}: any) {
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-red-600">
            Delete Blog
          </h2>
          <p className="text-gray-600 mt-1">
            This action cannot be undone
          </p>
        </div>

        <p className="text-gray-700">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-purple-900">
            {blog.title}
          </span>
          ?
        </p>

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
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  )
}
