import Section from '@/components/Section'

export default function About() {
  return (
    <>
      <Section
        title="About THULI"
        subtitle="That’s How U Learn It"
      >
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
          THULI is an edtech company focused on delivering high-quality
          computer science education, practical training, and technology
          solutions. We believe learning should be simple, practical,
          and career-oriented.
        </p>
      </Section>

      <Section title="What We Offer">
        <ul className="grid grid-cols-2 gap-6 text-gray-700">
          <li>• Computer Science Courses</li>
          <li>• School & College Tuitions</li>
          <li>• Software Development</li>
          <li>• Website Development</li>
          <li>• Digital Marketing</li>
          <li>• Seminars & Workshops</li>
        </ul>
      </Section>
    </>
  )
}
