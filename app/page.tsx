import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { HiAcademicCap, HiDesktopComputer, HiClipboardCheck, HiCurrencyDollar, HiClock, HiLightBulb } from 'react-icons/hi'
import CoursesCarousel from '@/components/CoursesCarousel'
import { FaLaptopCode, FaChalkboardTeacher } from 'react-icons/fa'

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('id, title, short_description, image_url')
    .limit(9)

  const { data: tuitions } = await supabase
    .from('tuitions')
    .select('id, title, class_level, subject, fees, mode, description')
    .limit(3)

  const { data: blogs } = await supabase
    .from('blogs')
    .select('id, title, content, cover_image')
    .limit(3)

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="relative px-16 md:px-32 py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-yellow-400 font-semibold mb-2">Looking to learn ‘how to Code’?</p>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-tight mb-4">
            Learn Programming <br />
            The way it's meant to be
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Join our community with 20+ day workshops on programming languages.
          </p>
          <Link
            href="/products"
            className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Know More
          </Link>
        </div>

        {/* Icon illustration instead of image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
  <div className="bg-purple-100 p-16 rounded-3xl shadow-2xl flex items-center justify-center text-purple-700 text-9xl hover:scale-105 transition-transform">
    <FaLaptopCode />
  </div>
</div>

      </section>

      {/* FEATURES SECTION */}
      <section className="px-16 md:px-32 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {[
            { icon: <HiAcademicCap />, title: 'Experts as Trainers' },
            { icon: <HiDesktopComputer />, title: 'LIVE Project' },
            { icon: <HiClipboardCheck />, title: 'Certification' },
            { icon: <HiCurrencyDollar />, title: 'Affordable Fees' },
            { icon: <HiClock />, title: 'Flexibility' },
            { icon: <HiLightBulb />, title: 'Easy Learning' },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition hover:scale-105 p-6 flex flex-col items-center justify-center"
            >
              <div className="bg-purple-900 text-white w-14 h-14 rounded-lg flex items-center justify-center mb-3 text-3xl">
                {f.icon}
              </div>
              <h3 className="text-purple-900 font-semibold text-lg md:text-base">
                {f.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="px-16 md:px-32 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-3">
          Popular Courses
        </h2>
        <p className="text-yellow-400 mb-6 text-xl">
          Practical, beginner-friendly, and career-focused courses
        </p>
        <CoursesCarousel products={products || []} />
      </section>

      {/* TUITIONS HERO SECTION */}
      <section className="px-16 md:px-32 py-24 bg-purple-50 rounded-3xl relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Left Side - Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-yellow-400 font-semibold text-lg mb-2">Expert Tuition for Every Student</p>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4 leading-snug">
              Classes 6 to 12 <br />
              CBSE, Matric, Foreign & IGCSE
            </h2>
            <p className="text-purple-900 text-lg mb-6">
              Personalized learning to help your child excel. Online, offline, and premium one-on-one sessions.
            </p>

            {/* Modes */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
              <span className="bg-white text-purple-900 font-semibold px-4 py-2 rounded-full shadow-md">Online</span>
              <span className="bg-white text-purple-900 font-semibold px-4 py-2 rounded-full shadow-md">Offline</span>
              <span className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                One-on-One <span className="text-xs bg-white text-yellow-500 px-1 rounded-full">Premium</span>
              </span>
            </div>

            {/* Call to action */}
            <Link
              href="/tuitions"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Join Now
            </Link>
          </div>

          {/* Right Side - Icon illustration */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
  <div className="bg-purple-100 p-16 rounded-3xl shadow-2xl flex items-center justify-center text-purple-700 text-9xl hover:scale-105 transition-transform">
    <FaChalkboardTeacher />
  </div>
</div>


        </div>

        {/* Decorative shapes */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-900 rounded-full opacity-10"></div>
      </section>

          {/* WHY THULI */}
  <section className="px-16 md:px-32 py-24 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">Why THULI?</h2>
          <p className="text-purple-900 max-w-2xl mx-auto text-xl">
            Learn with expert instructors, interactive classes, and hands-on projects.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { number: '01', title: 'Interactive Classes' },
            { number: '02', title: 'Get Certified' },
            { number: '03', title: 'Fully Practical' },
            { number: '04', title: 'No Prerequisite Required' },
          ].map((item) => (
            <div key={item.number} className="bg-purple-50 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold mb-3 text-2xl">
                {item.number}
              </div>
              <h3 className="text-yellow-400 font-semibold text-xl">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST BLOGS - HORIZONTAL CARDS */}
  <section className="px-16 md:px-32 py-24 bg-purple-50">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-900 text-center mb-4">
          Latest Blogs
        </h2>
        <p className="text-purple-900 text-center mb-12 text-xl">
          Stay updated with our latest tips and articles
        </p>

        <div className="space-y-8">
          {blogs?.map((b, i) => (
            <div
              key={b.id}
              className={`flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden transition hover:scale-105 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {b.cover_image && (
                <img
                  src={b.cover_image}
                  className="md:w-1/2 h-72 object-cover rounded-l-2xl md:rounded-l-2xl md:rounded-r-none"
                />
              )}
              <div className="p-8 md:w-1/2">
                <h3 className="text-purple-900 font-semibold text-2xl mb-3">
                  {b.title}
                </h3>
                <p className="text-yellow-400 text-lg mt-2">
                  {b.content?.slice(0, 150)}
                  {b.content && b.content.length > 150 ? '...' : ''}
                </p>
                <Link
                  href={`/blogs/${b.id}`}
                  className="inline-block mt-6 text-yellow-400 font-semibold text-lg hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA HERO SECTION */}
<section className="px-16 md:px-32 py-24 bg-gradient-to-r from-purple-50 via-white to-indigo-50 relative overflow-hidden rounded-3xl">
  <div className="max-w-4xl mx-auto text-center relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900 leading-snug">
      Ready to Start Your Journey?
    </h2>
    <p className="text-yellow-400 md:text-2xl mb-8">
      Join thousands of learners and kickstart your career today.
    </p>
    <Link
      href="/products"
      className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-12 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
    >
      Get Started
    </Link>
  </div>

  {/* Decorative shapes */}
  <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-900 rounded-full opacity-10 animate-pulse"></div>
  <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
</section>

    </div>
  )
}
