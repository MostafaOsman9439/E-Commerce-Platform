import { Link } from 'react-router-dom'
import { Product } from '../types'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      <div className="mb-4 flex h-52 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-3">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 min-w-0 flex-1 text-lg font-semibold text-gray-800">
          {product.title}
        </h3>
        <span className="max-w-40 shrink-0 truncate rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700">
          {product.category}
        </span>
      </div>

      <p className="mt-3 text-xl font-bold text-gray-800">${product.price.toFixed(2)}</p>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Add to cart
        </button>

        <Link
          to={`/product/${product.id}`}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          View details
        </Link>
      </div>
    </article>
  )
}
