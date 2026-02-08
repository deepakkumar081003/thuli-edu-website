'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useEffect, useState } from 'react'
import ProductModal from './ProductModal'
import DeleteModal from './DeleteModal'

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
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <section className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={() => {
            setEditingProduct(null)
            setShowModal(true)
          }}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p className="mt-6">Loading...</p>
      ) : (
        <table className="mt-6 w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{product.title}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3">
                  {product.is_active ? 'Yes' : 'No'}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product)
                      setShowModal(true)
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteProduct(product)}
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
