interface SidebarProps {
  categories: string[]
  selectedCategory: string
  onSelectedCategory: (category: string) => void
  maxPrice: number
  onPriceChange: (price: number) => void
}

export const Sidebar = ({
  categories,
  selectedCategory,
  onSelectedCategory,
  maxPrice,
  onPriceChange,
}: SidebarProps) => {
  const allCategories = ['all', ...categories]

  return (
    <aside className="h-fit w-full shrink-0 rounded-xl border border-gray-100 bg-white p-5 shadow-md lg:w-64">
      <h2 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold text-gray-800">
        Filter products
      </h2>
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-semibold text-gray-700">Categories</h3>
        <ul className="max-h-64 space-y-1 overflow-y-auto">
          {allCategories.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                onClick={() => onSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`w-full rounded-lg px-3 py-1.5 text-left text-sm capitalize transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label htmlFor="max-price" className="mb-2 block text-sm font-semibold text-gray-700">
          Max price: ${maxPrice}
        </label>
        <input
          id="max-price"
          type="range"
          min="0"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full cursor-pointer accent-blue-600"
        />
      </div>
    </aside>
  )
}
