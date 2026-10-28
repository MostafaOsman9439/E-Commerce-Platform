import { create } from 'zustand'
import { Product } from '../types'

interface ProductState {
  products: Product[]
  categories: string[]
  selectedCategory: string
  maxPrice: number
  isLoading: boolean
  error: string | null

  // These Functions Only Has One Purpose To Update The States, And Void For Returning Nothing
  setSelectedCategory: (category: string) => void
  setMaxPrice: (price: number) => void
  // () Means This Function Is Async Takes No Inputs Unlike The First Two And Returns Promise
  // Void Here For When It Dose Its Promise It Returns The Data In await And Store It In The ('Store's Folder')
  fetchProductsAndCategories: () => Promise<void>

  addProduct: (Product: Omit<Product, 'id'>) => void // Omit Means (Utility Type) Get A Copy Of The Original Product Data Except The ID
  deleteProduct: (id: number | string) => void
  updateProduct: (id: number | string, updateData: Partial<Product>) => void
}

// Like useState But Instead Of Using useState For Everyone Of Them We Do This
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  selectedCategory: 'all',
  maxPrice: 1000,
  isLoading: false,
  error: null,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setMaxPrice: (price) => set({ maxPrice: price }),

  fetchProductsAndCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('https://fakestoreapi.com/products'),
        fetch('https://fakestoreapi.com/products/categories'),
      ])

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error('An error occurred while fetching data from the server.')
      }

      const productsData: Product[] = await productsRes.json()
      const categoriesData: string[] = await categoriesRes.json()

      set({
        products: productsData,
        categories: categoriesData,
        isLoading: false,
      })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'An unexpected error occurred',
        isLoading: false,
      })
    }
  },

  addProduct: (newProduct) =>
    set((state) => ({
      products: [{ ...newProduct, id: Date.now() }, ...state.products],
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  updateProduct: (id, updateData) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updateData } : p)),
    })),
}))
