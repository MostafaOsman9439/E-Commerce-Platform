import React, { useState } from 'react'
import { useProductStore } from '../store/useProductStore'
import { Product } from '../types'

export const AdminDashboard: React.FC = () => {
  const { products, addProduct, deleteProduct, updateProduct } = useProductStore()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [editingId, setEditingId] = useState<number | string | null>(null)
  const [priceError, setPriceError] = useState('')

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const nextPrice = Number(price)

    if (!trimmedTitle || !price || !Number.isFinite(nextPrice) || nextPrice <= 0) {
      setPriceError('Price must be greater than 0.')
      return
    }

    setPriceError('')

    const existingProduct = editingId !== null ? products.find((product) => product.id === editingId) : null
    const productData = {
      title: trimmedTitle,
      price: nextPrice,
      category: category.trim() || 'General',
      image: image.trim() || 'https://via.placeholder.com/150',
      description: existingProduct?.description ?? 'No description available',
      stock: existingProduct?.stock ?? 0,
    }

    if (editingId !== null) {
      updateProduct(editingId, productData)
      setEditingId(null)
    } else {
      addProduct(productData)
    }

    setTitle('')
    setPrice('')
    setCategory('')
    setImage('')
  }

  const handleEditClick = (product: Product) => {
    setEditingId(product.id)
    setTitle(product.title)
    setPrice(product.price.toString())
    setCategory(product.category)
    setImage(product.image)
    setPriceError('')
  }

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setPrice('')
    setCategory('')
    setImage('')
    setPriceError('')
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {editingId !== null ? 'Edit product details' : 'Add a new product'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Example: sports T-shirt"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Price ($)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
                setPriceError('')
              }}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Example: Clothing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        {priceError && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {priceError}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className={`px-6 py-2.5 rounded-lg text-white font-medium transition shadow-sm ${
              editingId !== null
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingId !== null ? 'Save Changes' : 'Add Product'}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
          Current product list ({products.length})
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100/50 border-b text-gray-600 text-sm">
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-8 text-gray-500">
                  There are no products available at the moment.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50/80 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={product.image || 'https://via.placeholder.com/150'}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    <span className="font-medium text-gray-800 line-clamp-1">{product.title}</span>
                  </td>
                  <td className="p-4 text-gray-600 font-semibold">${product.price}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-yellow-50 text-yellow-700 px-3.5 py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-100 transition ml-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-50 text-red-700 px-3.5 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
