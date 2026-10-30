import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

export const Cart = () => {
	const { items, removeFromCart, clearCart } = useCartStore()
	const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

	return (
		<section className="min-h-full bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
			<div className="mx-auto w-full max-w-5xl">
				<h1 className="mb-6 border-b border-gray-200 pb-4 text-3xl font-bold text-gray-800">
					Your cart
				</h1>

				{items.length === 0 ? (
					<div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-md sm:p-12">
						<p className="mb-4 text-gray-600">Your cart is empty.</p>
						<Link to="/" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
							Browse products
						</Link>
					</div>
				) : (
					<div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
						<ul className="divide-y divide-gray-200">
							{items.map(({ product, quantity }) => (
								<li
									key={product.id}
									className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap sm:p-5"
								>
									<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-2">
										<img
											src={product.image}
											alt={product.title}
											className="h-full w-full object-contain"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<h2 className="line-clamp-2 font-semibold text-gray-800">
											{product.title}
										</h2>
										<p className="mt-1 text-sm text-gray-600">
											${product.price.toFixed(2)} x {quantity}
										</p>
									</div>
									<p className="font-semibold text-gray-800 sm:min-w-24 sm:text-right">
										${(product.price * quantity).toFixed(2)}
									</p>
									<button
										type="button"
										onClick={() => removeFromCart(product.id)}
										className="ml-auto rounded-lg bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100 sm:ml-0"
									>
										Remove
									</button>
								</li>
							))}
						</ul>

						<div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 p-4 sm:p-5">
							<button
								type="button"
								onClick={clearCart}
								className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
							>
								Clear cart
							</button>
							<p className="text-lg font-bold text-gray-800">
								Total: ${total.toFixed(2)}
							</p>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
