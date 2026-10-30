import { Link, useParams } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useProductStore } from '../store/useProductStore'

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const product = useProductStore((state) =>
    state.products.find((item) => item.id === productId)
  )
  const isLoading = useProductStore((state) => state.isLoading)
  const error = useProductStore((state) => state.error)
  const addToCart = useCartStore((state) => state.addToCart)

  if (isLoading) {
    return (
      <section className="min-h-full bg-gray-50 px-4 py-12">
        <p className="mx-auto max-w-6xl text-center text-gray-600">Loading product...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-full bg-gray-50 px-4 py-12">
        <p role="alert" className="mx-auto max-w-6xl rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </p>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="min-h-full bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-xl border border-gray-100 bg-white p-8 text-center shadow-md sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Product unavailable
          </p>
          <h1 className="mt-3 text-2xl font-bold text-gray-800">We could not find that product</h1>
          <p className="mt-2 text-gray-600">It may have been removed or the link may be incorrect.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Browse products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-full bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          <span aria-hidden="true">&larr;</span>
          Back to products
        </Link>

        <article className="mt-5 grid overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md md:grid-cols-2">
          <div className="flex min-h-80 items-center justify-center border-b border-gray-100 bg-gray-50 p-8 sm:p-12 md:min-h-[34rem] md:border-b-0 md:border-r">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-112 w-full object-contain"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-10 lg:p-12">
            <div>
              <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700">
                {product.category}
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-800 sm:text-4xl">
                {product.title}
              </h1>
            </div>

            <div className="mt-6 flex items-end gap-3 border-b border-gray-200 pb-6">
              <p className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
              <p className="pb-1 text-sm text-gray-500">Price</p>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-700">
                About this product
              </h2>
              <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
                {product.description || 'No description is available for this product yet.'}
              </p>
            </div>

            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Add to cart
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">
                You can review your items in the cart before checkout.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
