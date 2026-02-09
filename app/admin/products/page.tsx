'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useEffect, useState } from 'react'
import ProductModal from './ProductModal'
import DeleteModal from './DeleteModal'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [deleteProduct, setDeleteProduct] = useState<any>(null)

  async function fetchProducts() {
    setLoading(true)

    const { data, error } = await supabaseBrowser
      .from('products')
      .select(
        `
        *,
        categories (
          name
        )
      `
      )
      .order('created_at', { ascending: false })

    if (!error) setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const courses = products.filter(
  p => p.categories?.name === 'Course'
)

const solutions = products.filter(
  p => p.categories?.name !== 'Course'
)


  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Products
          </h1>
          <p className="text-yellow-400 text-lg">
            Manage courses & services
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null)
            setShowModal(true)
          }}
          className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          + Add Product
        </button>
      </div>

      {/* ================= COURSES ================= */}
<div className="mt-10">
  <h2 className="text-3xl font-bold text-purple-900 mb-2">
    Courses
  </h2>
  <p className="text-gray-600 mb-6">
    Hands-on technical courses with real-world projects
  </p>

  {courses.length === 0 ? (
    <p className="text-gray-500 py-10">
      No courses found
    </p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map(product => (
        <div
          key={product.id}
          className="group bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-purple-100"
        >
          {/* Image */}
          <div className="h-40 bg-gray-100 overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-purple-900 truncate">
              {product.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {product.categories?.name}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-indigo-600 font-semibold">
                {product.price ? `₹${product.price}` : 'Free'}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {product.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setEditingProduct(product)
                  setShowModal(true)
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:scale-105 transition"
              >
                <HiPencilAlt />
                Edit
              </button>

              <button
                onClick={() => setDeleteProduct(product)}
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
</div>

{/* ================= SOLUTIONS ================= */}
<div className="mt-20">
  <h2 className="text-3xl font-bold text-purple-900 mb-2">
    Solutions
  </h2>
  <p className="text-gray-600 mb-6">
    Industry-focused solutions and development services
  </p>

  {solutions.length === 0 ? (
    <p className="text-gray-500 py-10">
      No solutions found
    </p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {solutions.map(product => (
        <div
          key={product.id}
          className="group bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-purple-100"
        >
          {/* Image */}
          <div className="h-40 bg-gray-100 overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-purple-900 truncate">
              {product.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {product.categories?.name}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-indigo-600 font-semibold">
                {product.price ? `₹${product.price}` : 'Custom'}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {product.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setEditingProduct(product)
                  setShowModal(true)
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:scale-105 transition"
              >
                <HiPencilAlt />
                Edit
              </button>

              <button
                onClick={() => setDeleteProduct(product)}
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
</div>


      {/* Modals */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSaved={fetchProducts}
        />
      )}

      {deleteProduct && (
        <DeleteModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onDeleted={fetchProducts}
        />
      )}
    </section>
  )
}
