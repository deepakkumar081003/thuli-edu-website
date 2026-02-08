export default function AdminLoading() {
  return (
    <section className="p-10 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded" />
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
      </div>
    </section>
  )
}
