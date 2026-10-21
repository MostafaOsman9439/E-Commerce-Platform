import React from 'react'

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
    <aside className="w-64 bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">Filtering And Sorting</h2>
      <div className="mb-6">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Categories</h3>
        <ul className="space-y-1">
          {allCategories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onSelectedCategory(cat)}
                className={`w-full text-right px-3 py-1.5 rounded transition text-sm capitalize ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-medium'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Max Price: ${maxPrice}</h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
      </div>
    </aside>
  )
}
