import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default async function CoursesPage() {
  const { data, error } = await supabase
  .from('products')
  .select(`
    id,
    title,
    slug,
    short_description,
    price,
    discounted_price,
    image_url,
    categories!inner (
      name
    )
  `)
  .eq('categories.name', 'Course')


  if (error) {
    return (
      <p className="px-12 py-10 text-red-600">
        Failed to load courses
      </p>
    )
  }

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen">

{/* ================= TOP HERO SECTION ================= */}
<section className="relative px-16 md:px-32 py-16 overflow-hidden rounded-3xl bg-white">

  {/* Dot Matrix Pattern */}
  <div className="absolute inset-0 
    bg-[radial-gradient(circle,rgba(99,102,241,0.08)_1px,transparent_1px)] 
    [background-size:22px_22px] 
    pointer-events-none">
  </div>

  {/* Soft Radial Spotlight */}
  <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] 
    bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)] 
    -translate-x-1/2 -translate-y-1/2 pointer-events-none">
  </div>

  {/* Minimal Corner Accents */}
  <div className="absolute top-10 right-10 w-24 h-24 border border-indigo-200 rounded-2xl rotate-12 opacity-40"></div>
  <div className="absolute bottom-10 left-10 w-20 h-20 border border-purple-200 rounded-xl -rotate-12 opacity-40"></div>

  <div className="relative max-w-5xl mx-auto text-center z-10">

    <p className="text-purple-600 font-semibold text-lg mb-3">
      Learn • Build • Grow
    </p>

    <h1 className="text-5xl md:text-6xl font-extrabold text-purple-900 leading-tight">
      Join Industry-Ready Courses <br className="hidden md:block" />
      Built for Real-World Skills
    </h1>

    <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
      Our courses focus on practical learning, real-time projects, and hands-on experience —
      helping you gain skills that matter beyond the classroom.
    </p>

    <div className="mt-10 flex flex-wrap justify-center gap-6">
      <Link
        href="/contact"
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Join Our Learning Community
      </Link>
    </div>

  </div>
</section>




      {/* ================= COURSES SECTION ================= */}
<section className="px-12 md:px-32 py-20 relative overflow-hidden">

  {/* Dotted Pattern Background */}
  <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.12)_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none"></div>

  <div className="relative z-10">
    <h2 className="text-4xl font-bold text-purple-900 mb-12 text-center">
      Our Courses
    </h2>

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.map(course => (
        <Link
          key={course.id}
          href={`/products/${course.slug}`}
          className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden hover:scale-[1.02] duration-300"
        >
          <img
            src={course.image_url}
            alt={course.title}
            className="h-52 w-full object-cover"
          />

          <div className="p-6">
            <h3 className="text-xl font-semibold text-purple-900 text-center">
              {course.title}
            </h3>

            <p className="text-gray-600 text-sm mt-3 text-center">
              {course.short_description}
            </p>

            <div className="flex items-center justify-center mt-6">
              <div>
                {course.discounted_price ? (
                  <div className="flex items-center justify-center flex-wrap gap-2">
                    <span className="text-lg font-bold text-green-600">
                      ₹{course.discounted_price}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{course.price}
                    </span>

                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                      {Math.round(
                        ((course.price - course.discounted_price) / course.price) * 100
                      )}
                      % OFF
                    </span>
                  </div>
                ) : course.price ? (
                  <span className="text-lg font-bold text-green-600 block text-center">
                    ₹{course.price}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500 block text-center">
                    Free
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* ================= CTA HERO SECTION ================= */}
<section className="px-16 md:px-32 py-24 bg-gradient-to-r from-purple-50 via-white to-indigo-50 relative overflow-hidden rounded-3xl">

  <div className="max-w-4xl mx-auto text-center relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900 leading-snug">
  Learn by Building. Grow by Solving Real Problems.
</h2>

<p className="text-yellow-400 md:text-xl mb-10 max-w-2xl mx-auto">
  Our courses go beyond theory. You’ll learn practical, in-demand computer science
  skills through hands-on training, real-time projects, and industry-oriented
  solutions. Work on real use cases, build portfolio-ready projects, and gain
  experience that prepares you for real-world roles.
</p>

<Link
  href="/contact"
  className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-12 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
>
  Start Learning Practically
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
