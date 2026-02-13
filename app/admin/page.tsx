import Link from 'next/link'
import {
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlinePencilAlt,
  HiOutlineUsers,
  HiPencilAlt
} from 'react-icons/hi'

export default function AdminDashboard() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 px-12 md:px-32 py-30">
      
      {/* Header */}
      <div className="mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-3">
          Admin Dashboard
        </h1>
        <p className="text-yellow-400 text-xl">
          Welcome to the THULI admin panel
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Products */}
        <Link
          href="/admin/products"
          className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
        >
          <div className="bg-purple-900 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
            <HiOutlineBookOpen />
          </div>
          <h2 className="text-2xl font-semibold text-purple-900 mb-2">
            Products
          </h2>
          <p className="text-gray-600">
            Manage courses & services
          </p>
        </Link>

        {/* Tuitions */}
        <Link
          href="/admin/tuitions"
          className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
        >
          <div className="bg-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
            <HiOutlineClipboardList />
          </div>
          <h2 className="text-2xl font-semibold text-purple-900 mb-2">
            Tuitions
          </h2>
          <p className="text-gray-600">
            Manage tuition batches
          </p>
        </Link>

        {/* Blogs */}
        <Link
          href="/admin/blogs"
          className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
        >
          <div className="bg-yellow-400 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
            <HiOutlinePencilAlt />
          </div>
          <h2 className="text-2xl font-semibold text-purple-900 mb-2">
            Blogs
          </h2>
          <p className="text-gray-600">
            Manage blog posts
          </p>
        </Link>

        <Link
  href="/admin/enquiries"
  className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
>
  <div className="bg-orange-400 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
    <HiPencilAlt />
  </div>
  <h2 className="text-2xl font-semibold text-purple-900 mb-2">
    Enquiries
  </h2>
  <p className="text-gray-600">
    View and manage user enquiries
  </p>
</Link>


        <Link
  href="/admin/registrations"
  className="group bg-white rounded-3xl shadow-xl border border-purple-100 p-8 hover:shadow-2xl transition hover:-translate-y-1"
>
  <div className="bg-purple-300 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition">
    <HiOutlineUsers />
  </div>
  <h2 className="text-2xl font-semibold text-purple-900 mb-2">
    Registrations
  </h2>
  <p className="text-gray-600">
    View and manage user registrations
  </p>
</Link>


      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-300 opacity-10 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-400 opacity-10 rounded-full"></div>

    </section>
  )
}
