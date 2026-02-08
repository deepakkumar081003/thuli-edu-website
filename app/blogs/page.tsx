import { supabase } from '@/lib/supabaseClient'

export default async function Blogs() {
  const { data } = await supabase.from('blogs').select('*')

  return (
    <section className="px-12 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-primary mb-10">
        Blogs & Resources
      </h2>

      <div className="grid grid-cols-3 gap-8">
        {data?.map(blog => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={blog.cover_image}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-6">
              <h3 className="font-semibold text-lg">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {blog.content?.slice(0, 80)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
