import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { FaChalkboardTeacher } from 'react-icons/fa'

export default async function TuitionsPage() {
  const { data, error } = await supabase
    .from('tuitions')
    .select('*')

  if (error) {
    return (
      <p className="px-12 py-10 text-red-600">
        Failed to load tuitions
      </p>
    )
  }

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen">

      {/* ================= TOP HERO ================= */}
      <section className="px-16 md:px-32 py-16 relative overflow-hidden rounded-3xl bg-purple-50">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-yellow-400 font-semibold text-lg mb-2">
              Personalized Learning
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-snug mb-4">
              School & College <br /> Tuitions That Actually Work
            </h1>

            <p className="text-purple-900 text-lg mb-8">
              Expert guidance for Classes 6–12 and college students.
              Learn better with focused attention and flexible learning modes.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Join Tuition Program
            </Link>
          </div>

          {/* Icon */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="bg-purple-100 p-16 rounded-3xl shadow-2xl flex items-center justify-center text-purple-700 text-9xl">
              <FaChalkboardTeacher />
            </div>
          </div>

        </div>

        {/* Decorative shapes */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-900 rounded-full opacity-10"></div>
      </section>

      {/* ================= TUITIONS GRID ================= */}
<section className="px-12 md:px-32 py-20 relative overflow-hidden">

  {/* Dotted Pattern Background */}
  <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.12)_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none"></div>

  <div className="relative z-10">
    <h2 className="text-4xl font-bold text-purple-900 mb-12 text-center">
      Available Tuitions
    </h2>

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((tuition) => (
        <div
          key={tuition.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
        >
          <h3 className="text-xl font-semibold text-purple-900">
            {tuition.title}
          </h3>

          <p className="text-gray-600 text-sm mt-3 flex-1">
            {tuition.description}
          </p>

          <div className="mt-4 space-y-2 text-sm text-gray-700">
            {tuition.class_level && <p><strong>Class:</strong> {tuition.class_level}</p>}
            {tuition.subject && <p><strong>Subject:</strong> {tuition.subject}</p>}
            {tuition.mode && <p><strong>Mode:</strong> {tuition.mode}</p>}
            {tuition.fees && (
              <p className="font-semibold text-green-600">
                Fees: ₹{tuition.fees}
              </p>
            )}
          </div>

          <a
            href={`https://wa.me/917092097170?text=${encodeURIComponent(
              `Hi! I want to join the tuition "${tuition.title}".\nClass: ${tuition.class_level || 'N/A'}\nSubject: ${tuition.subject || 'N/A'}\nMode: ${tuition.mode || 'N/A'}\nFees: ₹${tuition.fees || 'N/A'}\nPlease provide me more details about joining.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-center bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Join Now
          </a>
        </div>
      ))}
    </div>

    {data?.length === 0 && (
      <p className="text-center text-gray-500 mt-12">
        No tuitions available at the moment.
      </p>
    )}
  </div>
</section>


      {/* ================= CTA HERO ================= */}
<section className="px-16 md:px-32 py-24 bg-gradient-to-r from-purple-50 via-white to-indigo-50 relative overflow-hidden rounded-3xl">
  <div className="max-w-4xl mx-auto text-center relative z-10">

    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900 leading-snug">
      Looking for Personalized Coaching?
    </h2>

    <p className="text-purple-700 md:text-xl mb-10 max-w-2xl mx-auto">
      Contact us to find the best tuition plan tailored for you or your child,
      with focused attention and expert guidance.
    </p>

    <Link
      href="/contact"
      className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-12 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
    >
      Contact Us
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
