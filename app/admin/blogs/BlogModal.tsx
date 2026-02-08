'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function BlogModal({ blog, onClose, onSaved }: any) {
  const isEdit = !!blog

  const [title, setTitle] = useState(blog?.title || '')
  const [slug, setSlug] = useState(blog?.slug || '')
  const [content, setContent] = useState(blog?.content || '')
  const [published, setPublished] = useState(blog?.is_published ?? false)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!title || !slug) {
      alert('Title and slug are required')
      return
    }

    setSaving(true)

    let coverImage = blog?.cover_image || null

    // ✅ IMAGE UPLOAD (same logic as products)
    if (imageFile) {
      const fileName = `blogs/${Date.now()}-${imageFile.name}`

      const { error } = await supabaseBrowser.storage
        .from('product-images')
        .upload(fileName, imageFile)

      if (error) {
        alert(error.message)
        setSaving(false)
        return
      }

      coverImage = supabaseBrowser.storage
        .from('product-images')
        .getPublicUrl(fileName).data.publicUrl
    }

    const payload = {
      title,
      slug,
      content: content || null,
      cover_image: coverImage,
      is_published: published,
    }

    const query = isEdit
      ? supabaseBrowser
          .from('blogs')
          .update(payload)
          .eq('id', blog.id)
      : supabaseBrowser.from('blogs').insert(payload)

    const { error } = await query

    if (error) {
      alert(error.message)
    } else {
      onSaved()
      onClose()
    }

    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">
          {isEdit ? 'Edit Blog' : 'Add Blog'}
        </h2>

        <input
          className="w-full p-2 border"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="w-full p-2 border"
          placeholder="Slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />

        <input
          type="file"
          onChange={e =>
            setImageFile(e.target.files?.[0] || null)
          }
        />

        <textarea
          className="w-full p-2 border min-h-[120px]"
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
          />
          Published
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            disabled={saving}
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
