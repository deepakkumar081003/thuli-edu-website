import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface Blog {
  id: string
  title: string
  slug: string
  content: string
  cover_image?: string
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params
  const { slug } = await params

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !blog) {
    return (
      <p className="px-12 py-10 text-red-600 text-center">
        Blog not found
      </p>
    )
  }

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-12">

      {/* Back Button */}
      <div className="self-start mb-8">
        <Link
          href="/blogs"
          className="text-purple-700 font-semibold hover:underline"
        >
          ← Back to Blogs
        </Link>
      </div>

      {/* Full-screen Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Cover Image */}
        {blog.cover_image && (
          <div className="relative h-96 md:h-[500px] w-full">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}


        {/* Content */}
        <div className="p-8 md:p-12 text-center md:text-left animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
            {blog.title}
          </h1>

          <div className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-purple-300 rounded-full opacity-20 animate-fadeInSlow"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-yellow-400 rounded-full opacity-10 animate-fadeInSlow"></div>
    </div>
  )
}
