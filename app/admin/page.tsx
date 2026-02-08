import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold text-primary">
        Admin Dashboard
      </h1>

      <p className="mt-4 text-gray-600">
        Welcome to the THULI admin panel.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="p-6 bg-white rounded shadow hover:shadow-lg transition"
        >
          <h2 className="font-semibold">Products</h2>
          <p className="text-sm text-gray-500">
            Manage courses & services
          </p>
        </Link>

        {/* Tuitions */}
        <Link
          href="/admin/tuitions"
          className="p-6 bg-white rounded shadow hover:shadow-lg transition"
        >
          <h2 className="font-semibold">Tuitions</h2>
          <p className="text-sm text-gray-500">
            Manage tuition batches
          </p>
        </Link>

        <Link
          href="/admin/blogs"
          className="p-6 bg-white rounded shadow hover:shadow-lg transition"
        >
          <h2 className="font-semibold">Blogs</h2>
          <p className="text-sm text-gray-500">
            Manage blog posts
          </p>
        </Link>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="font-semibold">Users</h2>
          <p className="text-sm text-gray-500">
            View registered students
          </p>
        </div>
      </div>
    </section>
  )
}
