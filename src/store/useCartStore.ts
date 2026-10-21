import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types'

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getTotalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const currentItems = get().items
        const existingIndex = currentItems.findIndex((item) => item.product.id === product.id)

        if (existingIndex > -1) {
          const updatedItems = currentItems.map((item, index) =>
            index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
          )
          set({ items: updatedItems })
        } else {
          set({ items: [...currentItems, { product, quantity: 1 }] })
        }
      },

      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
)
