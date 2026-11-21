import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { Product } from '../types'

// Shared "request in progress" marker, so two calls at once send only one request.
let productsFetchInProgress: Promise<void> | null = null

// Categories come from the products themselves, so they can never be out of sync.
const categoriesFrom = (products: Product[]) => [...new Set(products.map((p) => p.category))]

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

  // These return an error message, or null when it worked.
  addProduct: (product: Omit<Product, 'id'>) => Promise<string | null>
  updateProduct: (id: number, updateData: Partial<Product>) => Promise<string | null>
  deleteProduct: (id: number) => Promise<string | null>
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
        const { data, error } = await supabase.from('products').select('*').order('id')
        if (error) {
          throw new Error(error.message)
        }

        const products = (data ?? []) as Product[]
        set({ products, categories: categoriesFrom(products), isLoading: false })
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

  // Reloads the products from the database.
  resetProducts: () => get().fetchProductsAndCategories(),

  addProduct: async (newProduct) => {
    // .select().single() asks the database to send back the row it just created (with its new id).
    const { data, error } = await supabase.from('products').insert(newProduct).select().single()
    if (error) {
      return error.message
    }

    const products = [...get().products, data as Product]
    set({ products, categories: categoriesFrom(products) })
    return null
  },

  updateProduct: async (id, updateData) => {
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    if (error) {
      // PGRST116 means no row came back: the policy blocked it, or the product is gone.
      return error.code === 'PGRST116'
        ? 'Not allowed, or the product no longer exists.'
        : error.message
    }

    const products = get().products.map((p) => (p.id === id ? (data as Product) : p))
    set({ products, categories: categoriesFrom(products) })
    return null
  },

  deleteProduct: async (id) => {
    const { data, error } = await supabase.from('products').delete().eq('id', id).select()
    if (error) {
      return error.message
    }
    // A blocked delete does not throw an error, it just deletes zero rows.
    if (!data || data.length === 0) {
      return 'Not allowed, or the product no longer exists.'
    }

    const products = get().products.filter((p) => p.id !== id)
    set({ products, categories: categoriesFrom(products) })
    return null
  },
}))
