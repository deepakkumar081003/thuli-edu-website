export default function UnauthorizedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Unauthorized
        </h1>
        <p className="mt-4 text-gray-600">
          You don’t have permission to access this page.
        </p>
      </div>
    </section>
  )
}
