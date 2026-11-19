import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { Product } from '../types'

// Shared "request in progress" marker, so two calls at once send only one request.
let productsFetchInProgress: Promise<void> | null = null

interface ProductState {
  products: Product[]
  categories: string[]
  selectedCategory: string
  maxPrice: number
  isLoading: boolean
  error: string | null

  setSelectedCategory: (category: string) => void
  setMaxPrice: (price: number) => void
  fetchProductsAndCategories: () => Promise<void>
  resetProducts: () => Promise<void>

  addProduct: (product: Omit<Product, 'id'>) => void
  deleteProduct: (id: number | string) => void
  updateProduct: (id: number | string, updateData: Partial<Product>) => void
}

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [],
  categories: [],
  selectedCategory: 'all',
  maxPrice: 1000,
  isLoading: false,
  error: null,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setMaxPrice: (price) => set({ maxPrice: price }),

  fetchProductsAndCategories: () => {
    if (productsFetchInProgress) {
      return productsFetchInProgress
    }

    set({ isLoading: true, error: null })
    productsFetchInProgress = (async () => {
      try {
        // Ask the database for all products, oldest first.
        const { data, error } = await supabase.from('products').select('*').order('id')
        if (error) {
          throw new Error(error.message)
        }

        const products = (data ?? []) as Product[]
        // Categories come from the products themselves, so they can never be out of sync.
        const categories = [...new Set(products.map((p) => p.category))]
        set({ products, categories, isLoading: false })
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : 'An unexpected error occurred',
          isLoading: false,
        })
      } finally {
        productsFetchInProgress = null
      }
    })()

    return productsFetchInProgress
  },

  // Temporary: reloads the products from the database (the Admin "Reset" button uses it).
  resetProducts: () => get().fetchProductsAndCategories(),

  // These three still change only the in-memory list. Day 5 moves them to the database.
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