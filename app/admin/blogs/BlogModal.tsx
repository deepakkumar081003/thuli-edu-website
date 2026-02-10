'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { updateBlog } from './actions'

export default function BlogModal({ blog, onClose, onSaved }: any) {
  const isEdit = !!blog

  const [title, setTitle] = useState(blog?.title || '')
  const [slug, setSlug] = useState(blog?.slug || '')
  const [content, setContent] = useState(blog?.content || '')
  const [published, setPublished] = useState(blog?.is_published ?? false)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSave(e: any) {
    e.preventDefault()

    if (!title || !slug) {
      alert('Title and slug are required')
      return
    }

    setSaving(true)

    let coverImage = blog?.cover_image || null

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

    try {
  if (isEdit) {
    await updateBlog(blog.id, payload)
  } else {
    const { error } = await supabaseBrowser
      .from('blogs')
      .insert(payload)

    if (error) throw error
  }

  // ✅ CLOSE MODAL + REFRESH LIST
  onSaved()
  onClose()
} catch (err: any) {
  alert(err.message || 'Something went wrong')
} finally {
  setSaving(false)
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
            {isEdit ? 'Edit Blog' : 'Add Blog'}
          </h2>
          <p className="text-yellow-400 mt-1">
            Write and manage blog content
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
        </div>

        <textarea
          rows={6}
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
          placeholder="Blog content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        {/* Image & Published */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="file"
            onChange={e => setImageFile(e.target.files?.[0] || null)}
          />

          <label className="flex items-center gap-2 font-medium text-purple-900">
            <input
              type="checkbox"
              checked={published}
              onChange={e => setPublished(e.target.checked)}
            />
            Published
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
            {saving ? 'Saving...' : 'Save Blog'}
          </button>
        </div>
      </form>
    </div>
  )
}
