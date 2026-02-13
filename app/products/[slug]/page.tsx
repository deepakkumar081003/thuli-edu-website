import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import BuyNowButton from '@/components/BuyNowButton'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function CourseDetailPage({ params }: Props) {
  // ✅ REQUIRED in Next.js 15
  const { slug } = await params

  const { data: course, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !course) {
    return <p className="px-12 py-20 text-red-600">Course not found</p>
  }

  const finalPrice = course.discounted_price || course.price

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50">
      {/* HERO */}
      <section className="px-16 md:px-32 py-28 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Back Button */}
        <div className="self-start mb-8">
          <Link
            href="/products"
            className="text-purple-700 font-semibold hover:underline"
          >
            ← Back to Courses
          </Link>
        </div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-yellow-500 font-semibold mb-2">
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

              {/* {course.price && course.discounted_price ? (
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 px-4 py-2 rounded-full text-green-700 font-bold text-lg">
                    ₹{course.discounted_price}
                  </span>

                  <span className="text-gray-400 line-through text-lg">
                    ₹{course.price}
                  </span>

                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                    {Math.round(
                      ((Number(course.price) -
                        Number(course.discounted_price)) /
                        Number(course.price)) *
                        100
                    )}
                    % OFF
                  </span>
                </div>
              ) : course.price ? (
                <span className="bg-green-100 px-4 py-2 rounded-full text-green-700 font-semibold">
                  ₹{course.price}
                </span>
              ) : null} */}
            </div>

{/* OFFER + CTA BOX */}
<div className="mb-8 bg-gradient-to-r from-yellow-50 via-purple-50 to-indigo-50 border border-purple-200 rounded-3xl p-6 shadow-lg">

  <div className="flex items-center justify-between flex-wrap gap-2">
    <p className="text-purple-900 font-bold text-lg flex items-center gap-2">
      ⚡ Online Offer Active
    </p>

    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
      Limited Deal
    </span>
  </div>

  <p className="text-gray-700 mt-2 text-sm leading-relaxed">
    Book online to lock the best price. Offline pricing may differ.
  </p>

  {/* PRICE INSIDE BOX */}
  {course.price && course.discounted_price ? (
    <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
      <span className="bg-green-100 px-5 py-2 rounded-full text-green-700 font-extrabold text-xl shadow">
        ₹{course.discounted_price}
      </span>

      <span className="text-gray-400 line-through text-lg font-semibold">
        ₹{course.price}
      </span>

      <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
        {Math.round(
          ((Number(course.price) - Number(course.discounted_price)) /
            Number(course.price)) *
            100
        )}
        % OFF
      </span>
    </div>
  ) : course.price ? (
    <div className="mt-4 flex justify-center">
      <span className="bg-green-100 px-5 py-2 rounded-full text-green-700 font-extrabold text-xl shadow">
        ₹{course.price}
      </span>
    </div>
  ) : null}

  {/* BUY NOW CTA */}
  <div className="mt-5 flex justify-center scale-[1.08]">
    <BuyNowButton
      productId={course.id}
      title={course.title}
      price={finalPrice}
    />
  </div>

  {/* TRUST TAGS */}
  <div className="mt-5 flex flex-wrap justify-center gap-3">
    <span className="bg-white px-4 py-2 rounded-full shadow text-purple-800 text-sm font-medium">
      ✅ Instant Access
    </span>

    <span className="bg-white px-4 py-2 rounded-full shadow text-purple-800 text-sm font-medium">
      💳 Secure Payment
    </span>

    <span className="bg-white px-4 py-2 rounded-full shadow text-purple-800 text-sm font-medium">
      🎓 Confirmed Seat
    </span>
  </div>

</div>




            {/* SECONDARY ACTION */}
            <div className="flex gap-4 flex-wrap">
              <a
                href={`https://wa.me/917092097170?text=${encodeURIComponent(
                  `Hi! I'm interested in enrolling in the "${course.title}" course.\n\nCourse Details:\n- Duration: ${
                    course.duration || 'N/A'
                  }\n- Level: ${course.level || 'N/A'}\n- Price: ₹${
                    finalPrice || 'N/A'
                  }`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-purple-300 text-purple-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-purple-50 hover:scale-105 transition-transform duration-300"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={course.image_url || '/placeholder.jpg'}
              alt={course.title}
              className="rounded-3xl shadow-2xl max-h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* DETAILS */}
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
