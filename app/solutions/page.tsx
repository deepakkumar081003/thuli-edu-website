import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { HiDesktopComputer } from 'react-icons/hi'

export default async function SolutionsPage() {
  // Fetch categories with products (excluding 'Course')
  const { data: categories, error } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      products:products (
        id,
        title,
        short_description,
        image_url,
        price,
        discounted_price
      )
    `)
    .neq('name', 'Course')

  if (error) {
    return (
      <p className="px-12 py-10 text-red-600">
        Failed to load solutions
      </p>
    )
  }

  const order = ['Website', 'App Development', 'Seminar', 'Software', 'Digital Marketing'];

const sortedCategories = categories?.sort(
  (a, b) => order.indexOf(a.name) - order.indexOf(b.name)
);


  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-indigo-50 min-h-screen ">

      {/* ================= TOP HERO ================= */}
      <section className="px-16 md:px-32 py-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center md:justify-start">
            <div className="bg-purple-100 p-16 rounded-3xl shadow-2xl flex items-center justify-center text-purple-700 text-9xl">
              <HiDesktopComputer />
            </div>
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-yellow-400 font-semibold text-lg mb-2">
              We don’t just teach, we build
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-snug mb-4">
              Software, Websites & Digital Solutions
            </h1>

            <p className="text-purple-900 text-lg mb-8">
              From custom software to websites and mobile apps —  
              we help individuals and businesses turn ideas into reality.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Build With Us
            </Link>
          </div>
        </div>

        {/* accents */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 opacity-20 rotate-12 rounded-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 opacity-15 -rotate-12 rounded-3xl"></div>
      </section>

      {/* ================= SOLUTIONS BY CATEGORY ================= */}
<section className="px-12 md:px-32 py-24 relative overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl">

  {/* Dotted Pattern Background */}
  <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.15)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

  {/* Diagonal Stripe Overlay */}
  {/* <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(168,85,247,0.05)_25%,transparent_25%,transparent_50%,rgba(168,85,247,0.05)_50%,rgba(168,85,247,0.05)_75%,transparent_75%,transparent)] [background-size:60px_60px] opacity-40 pointer-events-none"></div> */}

  {/* Decorative Gradient Blobs */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 opacity-15 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400 opacity-15 rounded-full blur-3xl"></div>
  <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-pink-400 opacity-5 rounded-full blur-3xl -translate-x-1/2"></div>

  <div className="relative z-10 space-y-20">

    {categories?.map(category => (
      <div key={category.id}>
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
          {category.name}
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.products?.map(product => (
            <div
              key={product.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-purple-900">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm mt-3 flex-1">
                  {product.short_description}
                </p>

                {product.price && product.discounted_price ? (
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-bold text-indigo-600">
                      Starting from ₹{product.discounted_price}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.price}
                    </span>

                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {Math.round(
                        ((Number(product.price) - Number(product.discounted_price)) /
                          Number(product.price)) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>
                ) : product.price ? (
                  <p className="mt-3 text-lg font-bold text-indigo-600">
                    Starting from ₹{product.price}
                  </p>
                ) : null}

                <a
                  href={`https://wa.me/917092097170?text=${encodeURIComponent(
                    `Hi! I want to build "${product.title}". Can you provide details about the services available?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 
                            text-white text-center px-6 py-3 rounded-full font-semibold shadow-lg 
                            transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Build Now
                </a>
              </div>
            </div>
          ))}

          {category.products?.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No products available in this category.
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
</section>



      {/* ================= CTA HERO ================= */}
      <section className="px-16 md:px-32 py-24 bg-gradient-to-r from-purple-50 via-white to-indigo-50 relative overflow-hidden rounded-3xl">
        <div className="max-w-4xl mx-auto text-center relative z-10">

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900 leading-snug">
            Have an Idea? Let’s Build It
          </h2>

          <p className="text-purple-700 md:text-xl mb-10 max-w-2xl mx-auto">
            Work with our team on real-world software, websites,
            and digital products built using modern technologies and
            industry best practices.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold px-12 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Contact Us
          </Link>
        </div>

        <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-900 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
      </section>

    </div>
  )
}
