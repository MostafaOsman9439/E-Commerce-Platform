import { Navbar } from '../components/Navbar'
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

  const { addToCart, getTotalItems } = useCartStore()

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price <= maxPrice
    return matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar cartItemsCount={getTotalItems()} userRole="customer" />

      <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex gap-6">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
        />

        <main className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Available products ({filteredProducts.length})
          </h1>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6">
              {error}
            </div>
          )}

          {!isLoading && !error && filteredProducts.length === 0 && (
            <p className="text-gray-500">No products match the current filter options.</p>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
