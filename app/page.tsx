import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { HiAcademicCap, HiDesktopComputer, HiClipboardCheck, HiCurrencyDollar, HiClock, HiLightBulb } from 'react-icons/hi'
import CoursesCarousel from '@/components/CoursesCarousel'
import { FaLaptopCode, FaChalkboardTeacher, FaRupeeSign  } from 'react-icons/fa'

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('id, title, slug, short_description, image_url')
    .limit(9)

  const { data: tuitions } = await supabase
    .from('tuitions')
    .select('id, title, class_level, subject, fees, mode, description')
    .limit(3)

  const { data: blogs } = await supabase
    .from('blogs')
    .select('id, title, slug, content, cover_image')
    .order('created_at', { ascending: false })
    .limit(3)


  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="relative px-16 md:px-32 py-16 flex flex-col md:flex-row items-center gap-12">
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
<section className="px-16 md:px-32 py-10">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-center">
    {[
      { icon: <HiAcademicCap />, title: 'Experts as Trainers' },
      { icon: <HiDesktopComputer />, title: 'Live Projects' },
      { icon: <HiClipboardCheck />, title: 'Certification' },
      { 
        icon: <FaRupeeSign className="text-[0.85em]" />, 
        title: 'Affordable Fees' 
      },
      { icon: <HiClock />, title: 'Flexible Schedule' },
      { icon: <HiLightBulb />, title: 'Easy Learning' },

    ].map((f, i) => (
      <div
        key={i}
        className="flex flex-col items-center justify-center gap-3 group"
      >
        {/* Icon */}
        <div className="text-purple-700 text-4xl md:text-5xl group-hover:scale-110 transition-transform">
          {f.icon}
        </div>

        {/* Text */}
        <h3 className="text-purple-900 font-semibold text-base md:text-lg tracking-wide">
          {f.title}
        </h3>
      </div>
    ))}
  </div>
</section>

{/* HOME PAGE COURSES HERO SECTION*/}
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

  <div className="relative max-w-6xl mx-auto text-center z-10">

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
        href="/products"
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Explore All Courses
      </Link>
    </div>

    {/* ================= CAROUSEL INSIDE HERO ================= */}
    <div className="mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
        Popular Courses
      </h2>

      {/* <p className="text-purple-600 mb-10">
        Practical, beginner-friendly, and career-focused programs
      </p> */}

      <CoursesCarousel products={products || []} />
    </div>

  </div>
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

      {/* SOLUTIONS HERO SECTION */}
<section className="px-16 md:px-32 py-24 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
  
  {/* subtle tech grid pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

  <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

    {/* Left Side - Icon/Illustration */}
    <div className="md:w-1/2 flex justify-center md:justify-start">
      <div className="bg-purple-100 p-16 rounded-3xl shadow-2xl flex items-center justify-center text-purple-700 text-9xl hover:scale-105 transition-transform">
        <HiDesktopComputer />
      </div>
    </div>

    {/* Right Side - Text */}
    <div className="md:w-1/2 text-center md:text-left">
      <p className="text-yellow-400 font-semibold text-lg mb-2">
        We don’t just teach, we build!
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4 leading-snug">
        Software Solutions, Websites & Mobile Apps
      </h2>

      <p className="text-purple-900 text-lg mb-6">
  Collaborate with experts and turn ideas into real-world projects.
</p>

<div className="flex flex-col gap-4 items-center md:items-start">
  <Link
    href="/solutions"
    className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
  >
    Build Yours Now
  </Link>

  <div className="text-center md:text-left">
    <p className="text-purple-700 font-medium mb-2">
     Learn by building products that matter.  Want to join us to work on real-time projects?
    </p>
    <Link
      href="/contact"
      className="inline-block bg-yellow-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
    >
      Join Us
    </Link>
  </div>
</div>

    </div>

  </div>

  {/* angled accents instead of round blobs */}
  <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 opacity-20 rotate-12 rounded-3xl"></div>
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 opacity-15 -rotate-12 rounded-3xl"></div>

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
                  href={`/blogs/${b.slug}`}
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
