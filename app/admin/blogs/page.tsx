'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useEffect, useState } from 'react'
import BlogModal from './BlogModal'
import DeleteModal from './DeleteModal'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<any>(null)
  const [deleteBlog, setDeleteBlog] = useState<any>(null)

  async function fetchBlogs() {
    setLoading(true)

    const { data, error } = await supabaseBrowser
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setBlogs(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <section className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blogs</h1>

        <button
          onClick={() => {
            setEditingBlog(null)
            setShowModal(true)
          }}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + Add Blog
        </button>
      </div>

      {loading ? (
        <p className="mt-6">Loading...</p>
      ) : (
        <table className="mt-6 w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Published</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id} className="border-t">
                <td className="p-3">{blog.title}</td>
                <td className="p-3 text-sm text-gray-600">
                  {blog.slug}
                </td>
                <td className="p-3">
                  {blog.is_published ? 'Yes' : 'No'}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditingBlog(blog)
                      setShowModal(true)
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteBlog(blog)}
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
        <BlogModal
          blog={editingBlog}
          onClose={() => setShowModal(false)}
          onSaved={fetchBlogs}
        />
      )}

      {deleteBlog && (
        <DeleteModal
          blog={deleteBlog}
          onClose={() => setDeleteBlog(null)}
          onDeleted={fetchBlogs}
        />
      )}
    </section>
  )
}
