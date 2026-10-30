import { Link } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { ProductCard } from '../components/ProductCard'
import { useProductStore } from '../store/useProductStore'
import { useCartStore } from '../store/useCartStore'

export const Home = () => {
  const {
    products,
    categories,
    selectedCategory,
    maxPrice,
    isLoading,
    error,
    setSelectedCategory,
    setMaxPrice,
  } = useProductStore()

  const cartItems = useCartStore((state) => state.items)
  const addToCart = useCartStore((state) => state.addToCart)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price <= maxPrice
    return matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:flex-row">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
        />

        <main className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-md sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Available products <span className="text-blue-600">({filteredProducts.length})</span>
            </h1>

            <Link
              to="/cart"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              <span>Cart</span>
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-bold text-white">
                {totalItems}
              </span>
            </Link>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-white py-12 shadow-sm">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          )}

          {error && (
            <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {!isLoading && !error && filteredProducts.length === 0 && (
            <p className="rounded-xl border border-gray-100 bg-white p-6 text-gray-600 shadow-sm">
              No products match the current filter options.
            </p>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
