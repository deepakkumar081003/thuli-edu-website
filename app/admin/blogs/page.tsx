'use client'

import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useEffect, useState } from 'react'
import BlogModal from './BlogModal'
import DeleteBlogModal from './DeleteModal'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<any>(null)
  const [deleteBlog, setDeleteBlog] = useState<any>(null)

  async function fetchBlogs() {
    setLoading(true)

    const { data } = await supabaseBrowser
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    setBlogs(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Blogs
          </h1>
          <p className="text-yellow-400 text-lg">
            Manage articles & content
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBlog(null)
            setShowModal(true)
          }}
          className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          + Add Blog
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div
              key={blog.id}
              className="group bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-purple-100"
            >
              {/* Image */}
              <div className="h-40 bg-gray-100 overflow-hidden">
                {blog.cover_image ? (
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  /{blog.slug}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {blog.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingBlog(blog)
                      setShowModal(true)
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:scale-105 transition"
                  >
                    <HiPencilAlt />
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteBlog(blog)}
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

      {/* Modals */}
      {showModal && (
        <BlogModal
          blog={editingBlog}
          onClose={() => setShowModal(false)}
          onSaved={fetchBlogs}
        />
      )}

      {deleteBlog && (
        <DeleteBlogModal
          blog={deleteBlog}
          onClose={() => setDeleteBlog(null)}
          onDeleted={fetchBlogs}
        />
      )}
    </section>
  )
}
