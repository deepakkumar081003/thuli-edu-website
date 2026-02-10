'use client'

import { deleteBlog } from './actions'

export default function DeleteBlogModal({ blog, onClose, onDeleted }: any) {
  async function handleDelete() {
    try {
      await deleteBlog(blog.id)
      onDeleted()
      onClose()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-red-600">Delete Blog</h2>
        <p className="text-gray-700">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-purple-900">
            {blog.title}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 text-white rounded-lg"
          >
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  )
}
