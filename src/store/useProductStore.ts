import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types'

const PRODUCTS_URL = 'https://fakestoreapi.com/products'
const CATEGORIES_URL = 'https://fakestoreapi.com/products/categories'
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

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
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
            // If products were restored from localStorage, keep them (they contain the admin's changes).
            const needsProducts = get().products.length === 0

            const [productsRes, categoriesRes] = await Promise.all([
              needsProducts ? fetch(PRODUCTS_URL) : Promise.resolve(null),
              fetch(CATEGORIES_URL),
            ])

            if ((productsRes && !productsRes.ok) || !categoriesRes.ok) {
              throw new Error('An error occurred while fetching data from the server.')
            }

            const categoriesData: string[] = await categoriesRes.json()

            if (productsRes) {
              const productsData: Product[] = await productsRes.json()
              set({ products: productsData, categories: categoriesData, isLoading: false })
            } else {
              set({ categories: categoriesData, isLoading: false })
            }
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

      // Clears the saved products and loads the original ones from the API again.
      resetProducts: async () => {
        if (productsFetchInProgress) {
          await productsFetchInProgress
        }

        set({ products: [] })
        await get().fetchProductsAndCategories()
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
    }),
    {
      name: 'products-storage',
      // Save only the products. Loading flags, errors and filters should not be stored.
      partialize: (state) => ({ products: state.products }),
    }
  )
)
