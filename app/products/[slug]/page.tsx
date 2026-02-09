import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface Props {
  params: {
    slug: string
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params   // 👈 IMPORTANT

   const { data: course, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !course) {
    return (
      <p className="px-12 py-20 text-red-600">
        Course not found
      </p>
    )
  }

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 ">

      {/* ================= HERO ================= */}
<section className="px-16 md:px-32 py-28 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">

  {/* grid pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

  <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

    {/* Text */}
    <div>
      <p className="text-yellow-400 font-semibold mb-2">
        Industry Ready Course
      </p>

      <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
        {course.title}
      </h1>

      <p className="text-purple-900 text-lg mb-6">
        {course.short_description}
      </p>

      <div className="flex flex-wrap gap-4 mb-8">
        {course.duration && (
          <span className="bg-white px-4 py-2 rounded-full shadow text-purple-800 font-medium">
            ⏳ {course.duration}
          </span>
        )}
        {course.level && (
          <span className="bg-white px-4 py-2 rounded-full shadow text-purple-800 font-medium">
            🎯 {course.level}
          </span>
        )}
        {course.price && (
          <span className="bg-green-100 px-4 py-2 rounded-full text-green-700 font-semibold">
            ₹{course.price}
          </span>
        )}
      </div>

      <div className="flex gap-4 flex-wrap">
        {/* WhatsApp Enroll Button */}
        <a
          href={`https://wa.me/917092097170?text=${encodeURIComponent(
            `Hi! I'm interested in enrolling in the "${course.title}" course.\n\nCourse Details:\n- Duration: ${course.duration || 'N/A'}\n- Level: ${course.level || 'N/A'}\n- Price: ₹${course.price || 'N/A'}\n\nCould you please provide more information about the enrollment process?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Enroll Now
        </a>

        <Link
          href="/products"
          className="border-2 border-purple-600 text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition"
        >
          Back to Courses
        </Link>
      </div>
    </div>

    {/* Image */}
    <div className="flex justify-center">
      <img
        src={course.image_url}
        alt={course.title}
        className="rounded-3xl shadow-2xl max-h-[420px] object-cover"
      />
    </div>
  </div>
</section>


      {/* ================= DETAILS ================= */}
      <section className="px-12 md:px-32 py-10">
  <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-purple-900 mb-4">
      What You’ll Learn
    </h2>

    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
      {course.full_description}
    </p>
  </div>
</section>

    </div>
  )
}
