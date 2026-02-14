import Link from 'next/link'
import BuyNowButton from '@/components/BuyNowButton'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import OfferBox from '@/components/OfferBox'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params

  // ✅ get cookies for server-side Supabase
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          cookieStore.getAll().map(c => ({ name: c.name, value: c.value })),
        setAll: (cookiesToSet: { name: string; value: string }[]) => {
          cookiesToSet.forEach(c => cookieStore.set(c.name, c.value))
        },
      },
    }
  )

  // ✅ get user
  const { data: { user } } = await supabase.auth.getUser()

  // ✅ fetch course
  const { data: course, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !course) return <p>Course not found</p>

  // ✅ fetch registrations for this user
  let registrations: { product_id: string; mode: 'online' | 'one_on_one' }[] = []
  if (user) {
    const { data: regs } = await supabase
      .from('registrations')
      .select('product_id, mode')
      .eq('user_id', user.id)
      .eq('status', 'paid')
    if (regs) registrations = regs as any
  }

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50">
      {/* HERO */}
      <section className="px-16 md:px-32 py-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Back Button */}
        <div className="self-start mb-8">
          <Link href="/products" className="text-purple-700 font-semibold hover:underline">
            ← Back to Courses
          </Link>
        </div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-yellow-500 font-semibold mb-2">Industry Ready Course</p>

            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">{course.title}</h1>

            <p className="text-purple-900 text-lg mb-6">{course.short_description}</p>

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
            </div>

            {/* ✅ OfferBox with registrations */}
            <OfferBox course={course} registrations={registrations} />

            {/* WhatsApp button */}
            <div className="mt-4 flex gap-4 flex-wrap">
              <a
                href={`https://wa.me/917092097170?text=${encodeURIComponent(
                  `Hi! I'm interested in enrolling in the "${course.title}" course.\n\nCourse Details:\n- Duration: ${
                    course.duration || 'N/A'
                  }\n- Level: ${course.level || 'N/A'}\n- Price: ${
                    course.price ? '₹' + course.price : 'N/A'
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
          <h2 className="text-3xl font-bold text-purple-900 mb-4">What You’ll Learn</h2>
          <ul className="list-none text-gray-700 leading-relaxed space-y-2">
            {course.full_description.split('\n').map((point: string, idx: number) => (
              <li key={idx}>• {point.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
