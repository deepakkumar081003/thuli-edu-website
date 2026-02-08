import { supabase } from '@/lib/supabaseClient'

export default async function Solutions() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      title,
      short_description,
      categories ( name )
    `)
    .neq('categories.name', 'Course')

  if (error) {
    return <p className="px-12 py-10 text-red-600">Failed to load solutions</p>
  }

  return (
    <section className="px-12 py-16">
      <h2 className="text-3xl font-bold text-primary">
        Our Solutions
      </h2>

      <p className="text-gray-600 mt-3 max-w-3xl">
        Technology services designed to help businesses scale and grow.
      </p>

      <div className="grid grid-cols-3 gap-8 mt-12">
        {data?.map(p => (
          <div
            key={p.id}
            className="bg-white shadow rounded-xl p-6 hover:border-primary border transition"
          >
            <span className="text-xs text-accent font-semibold">
              {p.categories?.name}
            </span>

            <h3 className="font-semibold text-lg mt-2">
              {p.title}
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              {p.short_description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
