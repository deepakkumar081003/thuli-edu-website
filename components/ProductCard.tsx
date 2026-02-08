export default function ProductCard({ product }: any) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <img
        src={product.image_url}
        className="rounded-t-xl h-48 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-2">
          {product.short_description}
        </p>

        {product.price && (
          <p className="text-accent font-bold mt-4">
            ₹{product.price}
          </p>
        )}
      </div>
    </div>
  )
}
