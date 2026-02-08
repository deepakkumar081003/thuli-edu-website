'use client'

import { useState,useEffect } from 'react'
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
  const [active, setActive] = useState(
    product?.is_active ?? true
  )
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




  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabaseBrowser
        .from('categories')
        .select('id, name')
        .order('name')

      setCategories(data || [])
    }

    loadCategories()
  }, [])


  async function handleSave(e: any) {
    e.preventDefault()
    setSaving(true)

    let imageUrl = product?.image_url || null

    // ✅ IMAGE UPLOAD (browser is correct here)
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
      image_url: imageUrl,
      is_active: active,

      category_id: categoryId || null,
      short_description: shortDescription || null,
      full_description: fullDescription || null,
      duration: duration || null,
      level: level || null,
    }


    try {
      // ✅ SERVER ACTIONS (NO RLS ISSUE)
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSave}
        className="bg-white p-6 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">
          {isEdit ? 'Edit Product' : 'Add Product'}
        </h2>

        <input
          className="w-full p-2 border"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border"
          placeholder="Slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
        />

        <input
          type="number"
          className="w-full p-2 border"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <select
          className="w-full p-2 border"
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

        <textarea
          className="w-full p-2 border"
          placeholder="Short description"
          value={shortDescription}
          onChange={e => setShortDescription(e.target.value)}
        />

        <textarea
          className="w-full p-2 border"
          placeholder="Full description"
          value={fullDescription}
          onChange={e => setFullDescription(e.target.value)}
        />

        <input
          className="w-full p-2 border"
          placeholder="Duration (eg: 6 weeks)"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />

        <select
          className="w-full p-2 border"
          value={level}
          onChange={e => setLevel(e.target.value)}
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <input
          type="file"
          onChange={e =>
            setImageFile(e.target.files?.[0] || null)
          }
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={e => setActive(e.target.checked)}
          />
          Active
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
