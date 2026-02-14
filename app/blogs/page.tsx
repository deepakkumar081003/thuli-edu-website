import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { FaBookOpen } from 'react-icons/fa'

export default async function BlogsPage() {
  const { data, error } = await supabase
  .from('blogs')
  .select('*')
  .order('created_at', { ascending: false })


  if (error) {
    return (
      <p className="px-12 py-10 text-red-600">
        Failed to load blogs
      </p>
    )
  }

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen">

      {/* ================= TOP HERO ================= */}
      <section className="px-16 md:px-32 py-16 relative overflow-hidden rounded-3xl bg-indigo-50">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-yellow-400 font-semibold text-lg mb-2">
              Learn • Build • Grow
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-snug mb-4">
              Blogs & Learning <br /> Resources
            </h1>

            <p className="text-purple-900 text-lg mb-8">
              Practical guides, tutorials, and insights from real-world
              projects to help you learn faster and smarter.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Contribute or Collaborate
            </Link>
          </div>

          {/* Icon */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="bg-indigo-100 p-16 rounded-3xl shadow-2xl flex items-center justify-center text-indigo-700 text-9xl">
              <FaBookOpen />
            </div>
          </div>

        </div>

        {/* Decorative shapes */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-indigo-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-900 rounded-full opacity-10"></div>
      </section>

      {/* ================= BLOGS LIST ================= */}
<section className="px-12 md:px-32 py-20">
  <h2 className="text-4xl font-bold text-purple-900 mb-12 text-center">
    Latest Articles
  </h2>

  <div className="space-y-16 max-w-6xl mx-auto">
    {data?.map((blog, index) => {
      const isReverse = index % 2 !== 0

      return (
        <div
          key={blog.id}
          className={`flex flex-col md:flex-row ${
            isReverse ? 'md:flex-row-reverse' : ''
          } items-center gap-10`}
        >
          {/* Image */}
          {blog.cover_image && (
            <div className="md:w-1/2 w-full">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="md:w-1/2 w-full bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-purple-900">
              {blog.title}
            </h3>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {blog.content?.slice(0, 220)}...
            </p>

            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-block mt-6 text-purple-700 font-semibold hover:underline"
            >
              Read full article →
            </Link>

          </div>
        </div>
      )
    })}
  </div>

  {data?.length === 0 && (
    <p className="text-center text-gray-500 mt-12">
      No blogs published yet.
    </p>
  )}
</section>


      {/* ================= CTA HERO ================= */}
<section className="px-16 md:px-32 py-24 bg-gradient-to-r from-purple-50 via-white to-indigo-50 relative overflow-hidden rounded-3xl">
  <div className="max-w-4xl mx-auto text-center relative z-10">

    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900 leading-snug">
      Want to Learn by Building Real Projects?
    </h2>

    <p className="text-purple-700 md:text-xl mb-10 max-w-2xl mx-auto">
      Join our courses or collaborate with us on real-time development
      and research projects that mirror industry challenges.
    </p>

    <Link
      href="/contact"
      className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-12 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
    >
      Get in Touch
    </Link>
  </div>

  {/* Decorative shapes */}
  <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-900 rounded-full opacity-10"></div>
  <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
</section>


    </div>
  )
}
