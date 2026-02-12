'use client'

import { useState, useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { createProduct, updateProduct } from './action'

export default function ProductModal({
  product,
  onClose,
  onSaved,
}: any) {
  const isEdit = !!product

  const [title, setTitle] = useState(product?.title || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [price, setPrice] = useState(product?.price || '')
  const [active, setActive] = useState(product?.is_active ?? true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const [categories, setCategories] = useState<any[]>([])
  const [categoryId, setCategoryId] = useState(product?.category_id || '')

  const [shortDescription, setShortDescription] = useState(
    product?.short_description || ''
  )
  const [fullDescription, setFullDescription] = useState(
    product?.full_description || ''
  )
  const [duration, setDuration] = useState(product?.duration || '')
  const [level, setLevel] = useState(product?.level || '')

  const [discountedPrice, setDiscountedPrice] = useState(
  product?.discounted_price || ''
)


  useEffect(() => {
  async function loadCategories() {
    const { data, error } = await supabaseBrowser
      .from('categories')
      .select('id, name')
      .order('name')

    console.log('Categories:', data)
    console.log('Error:', error)

    setCategories(data || [])
  }

  loadCategories()
}, [])


  async function handleSave(e: any) {
    e.preventDefault()
    setSaving(true)

    let imageUrl = product?.image_url || null

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`

      const { error } = await supabaseBrowser.storage
        .from('product-images')
        .upload(`products/${fileName}`, imageFile)

      if (error) {
        alert(error.message)
        setSaving(false)
        return
      }

      imageUrl = supabaseBrowser.storage
        .from('product-images')
        .getPublicUrl(`products/${fileName}`).data.publicUrl
    }

    const payload = {
      title,
      slug,
      price: price || null,
      discounted_price: discountedPrice || null,
      image_url: imageUrl,
      is_active: active,
      category_id: categoryId || null,
      short_description: shortDescription || null,
      full_description: fullDescription || null,
      duration: duration || null,
      level: level || null,
    }


    try {
      if (isEdit) {
        await updateProduct(product.id, payload)
      } else {
        await createProduct(payload)
      }

      onSaved()
      onClose()
    } catch (err: any) {
      alert(err.message)
    }

    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

      <form
        onSubmit={handleSave}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-6"
      >
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-purple-900">
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h2>
          <p className="text-yellow-400 mt-1">
            Fill in the course or service details
          </p>
        </div>

        {/* Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Slug"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Price (₹)"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <input
            type="number"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Discounted Price (₹)"
            value={discountedPrice}
            onChange={e => setDiscountedPrice(e.target.value)}
          />


          <select
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Duration (eg: 6 weeks)"
            value={duration}
            onChange={e => setDuration(e.target.value)}
          />

          <select
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            value={level}
            onChange={e => setLevel(e.target.value)}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Descriptions */}
        <textarea
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
          rows={3}
          placeholder="Short description"
          value={shortDescription}
          onChange={e => setShortDescription(e.target.value)}
        />

        <textarea
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
          rows={5}
          placeholder="Full description"
          value={fullDescription}
          onChange={e => setFullDescription(e.target.value)}
        />

        {/* Image & Active */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="file"
            className="text-sm"
            onChange={e => setImageFile(e.target.files?.[0] || null)}
          />

          <label className="flex items-center gap-2 font-medium text-purple-900">
            <input
              type="checkbox"
              checked={active}
              onChange={e => setActive(e.target.checked)}
            />
            Active
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
