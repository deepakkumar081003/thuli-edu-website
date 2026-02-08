export default function Section({
  title,
  subtitle,
  children
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="px-12 py-16">
      <h2 className="text-4xl font-bold text-primary">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-gray-600 max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </section>
  )
}
