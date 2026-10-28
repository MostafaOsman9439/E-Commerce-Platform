import { create } from 'zustand'

interface AuthState {
  user: {
    username: string
    role: 'customer' | 'admin'
  } | null
  login: (username: string, role: 'customer' | 'admin') => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (username, role) => set({ user: { username, role } }),
  logout: () => set({ user: null }),
}))
