import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: {
    username: string
    role: 'customer' | 'admin'
  } | null // Null Means Nobody Is Logged In
  login: (username: string, role: 'customer' | 'admin') => void
  logout: () => void
}

// Same Pattern As The Cart Store
// Persist Saves The State To LocalStorage
// And Restores It When The Page Loads, Why Did We Do This ? So A Refresh No Longer Logs You Out
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (username, role) => set({ user: { username, role } }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)