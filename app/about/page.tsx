import Link from 'next/link'
import { HiAcademicCap, HiDesktopComputer, HiUsers, HiLightBulb } from 'react-icons/hi'

export default function About() {
  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen">

      {/* ABOUT HERO SECTION */}
      <section className="px-16 md:px-32 py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-yellow-400 font-semibold mb-2">
            That’s How U Learn It
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-tight mb-4">
            About THULI
          </h1>

          <p className="text-gray-600 text-lg max-w-xl mb-6">
            THULI is an edtech and technology company focused on making learning
            practical, simple, and career-oriented. We bridge the gap between
            education and real-world application by teaching and building.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Get in Touch
          </Link>
        </div>

        {/* Icon Illustration */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="bg-purple-100 p-16 rounded-3xl shadow-2xl flex items-center justify-center text-purple-700 text-9xl hover:scale-105 transition-transform">
            <HiLightBulb />
          </div>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="px-16 md:px-32 py-24 bg-white rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            What We Do
          </h2>
          <p className="text-purple-900 text-xl max-w-3xl mx-auto">
            We don’t believe in theory alone. Everything we offer is designed to
            create real impact through hands-on learning and real projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <HiAcademicCap />,
              title: 'Courses',
              desc: 'Beginner-friendly programming courses focused on practical skills and career growth.',
            },
            {
              icon: <HiDesktopComputer />,
              title: 'Software & Solutions',
              desc: 'We build software solutions, websites, and mobile apps — and involve learners in the process.',
            },
            {
              icon: <HiUsers />,
              title: 'Tuitions',
              desc: 'Personalized school and college tuitions with online, offline, and one-on-one options.',
            },
            {
              icon: <HiLightBulb />,
              title: 'Seminars & Workshops',
              desc: 'Industry-focused seminars and workshops conducted for colleges and institutions.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-purple-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition hover:scale-105"
            >
              <div className="bg-purple-900 text-white w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl">
                {item.icon}
              </div>
              <h3 className="text-purple-900 font-semibold text-xl mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDERS / STORY SECTION */}
      <section className="px-16 md:px-32 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
            Our Story
          </h2>

          <p className="text-purple-900 text-lg leading-relaxed mb-6">
            THULI was founded with a simple belief — learning should not feel
            complicated or disconnected from real life. Too often, students
            learn concepts without understanding how they are applied in the
            industry.
          </p>

          <p className="text-purple-900 text-lg leading-relaxed">
            Our founders and mentors come from technical backgrounds and have
            worked closely with students and professionals. This allows us to
            design programs that focus on clarity, confidence, and real-world
            readiness.
          </p>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
<section className="px-16 md:px-32 py-20 bg-gradient-to-b from-purple-50 to-white">
  <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:p-14">
    
    <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">
      Meet the Founder
    </h2>

    <div className="flex flex-col md:flex-row items-center gap-10">
      
      {/* Founder Image */}
      <div className="flex-shrink-0">
        <img
          src="/founder.jpg"   // replace with actual image
          alt="Founder"
          className="w-44 h-44 object-cover rounded-full border-4 border-purple-200 shadow-md"
        />
      </div>

      {/* Founder Info */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold text-purple-900">
          Founder Name
        </h3>
        <p className="text-purple-600 font-medium mt-1">
          Founder & Lead Engineer
        </p>

        <p className="text-gray-600 mt-4 max-w-xl">
          Passionate about building real-world software solutions and mentoring
          students through hands-on, industry-level projects.
        </p>

        {/* Socials */}
        <div className="flex justify-center md:justify-start gap-4 mt-6">
          <a href="#" className="text-purple-600 hover:text-purple-800">
            LinkedIn
          </a>
          <a href="#" className="text-purple-600 hover:text-purple-800">
            GitHub
          </a>
        </div>
      </div>

    </div>
  </div>
</section>


    </div>
  )
}
