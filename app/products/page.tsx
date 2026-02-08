import { supabase } from '@/lib/supabaseClient'

export default async function ProductsPage() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      title,
      short_description,
      price,
      image_url,
      categories ( name )
    `)
    .eq('categories.name', 'Course')

  if (error) {
    return <p className="px-12 py-10 text-red-600">Failed to load courses</p>
  }

  return (
    <section className="px-12 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-primary mb-10">
        Our Courses
      </h2>

      <div className="grid grid-cols-3 gap-8">
        {data?.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={p.image_url}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-6">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {p.short_description}
              </p>

              {p.price && (
                <p className="text-success font-bold mt-4">
                  ₹{p.price}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
