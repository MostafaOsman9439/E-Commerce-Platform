import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

export const Cart = () => {
	const { items, removeFromCart, clearCart } = useCartStore()
	const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

	return (
		<section className="max-w-5xl w-full mx-auto p-6">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Your cart</h1>

			{items.length === 0 ? (
				<div className="py-12 text-center">
					<p className="text-gray-600 mb-4">Your cart is empty.</p>
					<Link to="/" className="text-blue-600 hover:underline">
						Browse products
					</Link>
				</div>
			) : (
				<>
					<ul className="divide-y divide-gray-200">
						{items.map(({ product, quantity }) => (
							<li key={product.id} className="flex items-center gap-4 py-5">
								<img
									src={product.image}
									alt={product.title}
									className="h-20 w-20 object-contain"
								/>
								<div className="flex-1 min-w-0">
									<h2 className="font-semibold text-gray-800">{product.title}</h2>
									<p className="text-gray-600">
										${product.price.toFixed(2)} x {quantity}
									</p>
								</div>
								<p className="font-semibold text-gray-800">
									${(product.price * quantity).toFixed(2)}
								</p>
								<button
									type="button"
									onClick={() => removeFromCart(product.id)}
									className="text-red-600 hover:text-red-700"
								>
									Remove
								</button>
							</li>
						))}
					</ul>

					<div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5">
						<button
							type="button"
							onClick={clearCart}
							className="text-gray-600 hover:text-gray-800"
						>
							Clear cart
						</button>
						<p className="text-lg font-bold text-gray-800">Total: ${total.toFixed(2)}</p>
					</div>
				</>
			)}
		</section>
	)
}
