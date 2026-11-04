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

      // If A Fetch Is Already Running Return That Same One So There Are No Duplicate Requests
      fetchProductsAndCategories: () => {
        if (productsFetchInProgress) {
          return productsFetchInProgress
        }

        // Mark isLoading As True.
        set({ isLoading: true, error: null })
        productsFetchInProgress = (async () => {
          try {
            // If Products Were Restored From LocalStorage Keep Them why ? They Contain The Admin's Changes
            const needsProducts = get().products.length === 0

            // I Deduplicated concurrent Requests By Sharing The In-Flight Promise
            // If The Code Threw An Error Before The First Await
            // Finally Would Run Before The Assignment
            // And The Variable Would End Up Holding A Finished Promise Forever
            // Blocking Later Fetches
            // We Need To Avoid That Because Fetch Returns A Promise And Doesn’t Throw Directly
            // Ai Fixed This For Me !!

            // Check If Saved Products Exist From LocalStorage.
            // Fetch Categories Always And Products Only
            // If None Are Saved Both At The Same Time With Promise.all
            const [productsRes, categoriesRes] = await Promise.all([
              needsProducts ? fetch(PRODUCTS_URL) : Promise.resolve(null),
              fetch(CATEGORIES_URL),
            ])

            // If Any Response Isn’t ok, Throw An Error.
            if ((productsRes && !productsRes.ok) || !categoriesRes.ok) {
              throw new Error('An error occurred while fetching data from the server.')
            }

            // Save The Data Into State
            const categoriesData: string[] = await categoriesRes.json()

            if (productsRes) {
              const productsData: Product[] = await productsRes.json()
              set({ products: productsData, categories: categoriesData, isLoading: false })
            } else {
              set({ categories: categoriesData, isLoading: false })
            }

            // And On Error Save The Message
          } catch (err) {
            set({
              error: err instanceof Error ? err.message : 'An unexpected error occurred',
              isLoading: false,
            })

            // finally Clears The Running Marker Whether It Worked Or Not.
          } finally {
            productsFetchInProgress = null
          }
        })()

        return productsFetchInProgress
      },

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
      // Save The Products Only Loading/Errors/Filters Should Not Be Stored
      partialize: (state) => ({ products: state.products }),
    }
  )
)
