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
		return <p className="max-w-5xl mx-auto p-6 text-gray-600">Loading product...</p>
	}

	if (error) {
		return <p className="max-w-5xl mx-auto p-6 text-red-600">{error}</p>
	}

	if (!product) {
		return (
			<section className="max-w-5xl mx-auto p-6">
				<p className="text-gray-600 mb-4">Product not found.</p>
				<Link to="/" className="text-blue-600 hover:underline">
					Back to products
				</Link>
			</section>
		)
	}

	return (
		<article className="max-w-5xl w-full mx-auto p-6">
			<Link to="/" className="text-blue-600 hover:underline">
				Back to products
			</Link>
			<div className="mt-6 grid gap-8 md:grid-cols-2">
				<div className="flex min-h-80 items-center justify-center bg-white p-6">
					<img src={product.image} alt={product.title} className="max-h-80 max-w-full object-contain" />
				</div>
				<div>
					<p className="text-sm capitalize text-gray-500">{product.category}</p>
					<h1 className="mt-2 text-2xl font-bold text-gray-800">{product.title}</h1>
					<p className="mt-4 text-xl font-semibold text-gray-800">${product.price.toFixed(2)}</p>
					<p className="mt-4 leading-7 text-gray-600">{product.description}</p>
					<button
						type="button"
						onClick={() => addToCart(product)}
						className="mt-6 rounded bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
					>
						Add to cart
					</button>
				</div>
			</div>
		</article>
	)
}
