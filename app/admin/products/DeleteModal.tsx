'use client'

import { deleteProduct } from './action'
import { FaTrashAlt, FaExclamationTriangle } from 'react-icons/fa'

export default function DeleteModal({
  product,
  onClose,
  onDeleted,
}: any) {
  async function handleDelete() {
    try {
      await deleteProduct(product.id)
      onDeleted()
      onClose()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-white via-red-50 to-pink-50 p-8 shadow-2xl border border-red-100">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-red-100 text-red-600 text-3xl shadow">
            <FaExclamationTriangle />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-red-700">
          Delete Product
        </h2>

        {/* Message */}
        <p className="mt-4 text-center text-gray-700">
          Are you sure you want to delete
        </p>
        <p className="text-center font-semibold text-gray-900">
          “{product.title}”?
        </p>

        <p className="mt-2 text-center text-sm text-gray-500">
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition flex items-center justify-center gap-2"
          >
            <FaTrashAlt />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
