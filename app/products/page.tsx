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

      {/* TOP HERO SECTION */}
<section className="px-16 md:px-32 py-28 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">

  {/* subtle tech grid pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

  <div className="relative max-w-5xl mx-auto text-center">

    <p className="text-yellow-400 font-semibold text-lg mb-3">
  Learn • Build • Grow
</p>

<h1 className="text-5xl md:text-6xl font-extrabold text-purple-900 leading-tight">
  Join Industry-Ready Courses <br className="hidden md:block" />
  Built for Real-World Skills
</h1>

<p className="mt-6 text-lg text-purple-900 max-w-2xl mx-auto">
  Our courses focus on practical learning, real-time projects, and hands-on experience — 
  helping you gain skills that matter beyond the classroom.
</p>

<div className="mt-10 flex flex-wrap justify-center gap-6">


  <Link
    href="/contact"
    className="bg-yellow-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
  >
    Join Our Learning Community
  </Link>
</div>


  </div>

  {/* angled accents */}
  <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 opacity-20 rotate-12 rounded-3xl"></div>
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 opacity-15 -rotate-12 rounded-3xl"></div>

</section>


      {/* ================= COURSES SECTION ================= */}
      <section className="px-12 md:px-32 py-20">
        <h2 className="text-4xl font-bold text-purple-900 mb-12 text-center">
          Our Courses
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={course.image_url}
                alt={course.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-purple-900">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mt-3">
                  {course.short_description}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <div>
                    {course.discounted_price ? (
                      <div className="flex items-center gap-2">
                        {/* Discounted Price */}
                        <span className="text-lg font-bold text-green-600">
                          ₹{course.discounted_price}
                        </span>

                        {/* Original Price */}
                        <span className="text-sm text-gray-400 line-through">
                          ₹{course.price}
                        </span>

                        {/* % Badge */}
                        <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                          {Math.round(
                            ((course.price - course.discounted_price) / course.price) * 100
                          )}
                          % OFF
                        </span>
                      </div>
                    ) : course.price ? (
                      <span className="text-lg font-bold text-green-600">
                        ₹{course.price}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">Free</span>
                    )}
                  </div>

                  <Link
                    href={`/products/${course.slug}`}
                    className="text-purple-700 font-semibold hover:underline"
                  >
                    View Details →
                  </Link>
                </div>

              </div>
            </div>
          ))}
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
