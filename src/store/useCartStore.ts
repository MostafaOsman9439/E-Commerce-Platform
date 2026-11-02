import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
}

export const selectCartCount = (state: { items: CartItem[] }) =>
  state.items.reduce((total, item) => total + item.quantity, 0)

// create<CartState>()(...) With Two Sets Of Parentheses This Is How Zustand + TypeScript
// Work Together When We Use Middleware Like Persist.
export const useCartStore = create<CartState>()(
  persist(
    // set = Change The State, get = Read The Current State
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const currentItems = get().items
        const existing = currentItems.find((item) => item.product.id === product.id)

        if (existing) {
          // We Don't Change The Old Array Directly, Because React Only Notices New References.
          set({
            items: currentItems.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          })
        } else {
          set({ items: [...currentItems, { product, quantity: 1 }] })
        }
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) })
      },

      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })
      },

      decreaseQuantity: (productId) => {
        set({
          items: get()
            .items.map((item) =>
              item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      // Persist Copies The Cart To LocalStorage Under This Key And Restores It On Reload.
      name: 'shopping-cart-storage',
    }
  )
)
