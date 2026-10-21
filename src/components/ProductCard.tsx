import { Product } from '../types'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void // Void Means That This Function Receives Something (Product) And Return Nothing
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // <= Means That (ProductCard) Will Receive Props From (ProductCardProps) "product, addToCart" Only Nothing More Or less
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
      <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
      <p className="text-gray-600 font-bold mt-2">${product.price}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add To Your Cart
        </button>
      </div>
    </div>
  )
}
