import { supabase } from '@/lib/supabaseClient'

export default async function Tuitions() {
  const { data } = await supabase.from('tuitions').select('*')

  return (
    <section className="px-12 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-primary mb-10">
        Tuitions & Coaching
      </h2>

      <div className="grid grid-cols-2 gap-8">
        {data?.map(t => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h3 className="font-semibold text-lg">{t.title}</h3>
            <p className="text-gray-600 mt-2">
              {t.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
