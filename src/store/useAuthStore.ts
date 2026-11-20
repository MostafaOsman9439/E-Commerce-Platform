import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type Role = 'customer' | 'admin'

export interface AuthUser {
  id: string
  email: string
  role: Role
}

interface AuthResult {
  ok: boolean
  message: string
}

interface AuthState {
  user: AuthUser | null
  // True until we know whether someone is already logged in.
  // It stops a page refresh from redirecting a logged-in admin to /login.
  isLoading: boolean
  initialize: () => () => void
  signUp: (email: string, password: string) => Promise<AuthResult>
  signIn: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<void>
}

// Turns a Supabase session into our own user object, including the role from the database.
async function loadUser(session: Session | null): Promise<AuthUser | null> {
  if (!session) {
    return null
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .maybeSingle()

  // If the profile can't be read, fall back to the safest role.
  const role: Role = !error && data?.role === 'admin' ? 'admin' : 'customer'
  return { id: session.user.id, email: session.user.email ?? '', role }
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: true,

  initialize: () => {
    // 1. On page load, restore the session Supabase saved in the browser.
    supabase.auth.getSession().then(async ({ data }) => {
      set({ user: await loadUser(data.session), isLoading: false })
    })

    // 2. Afterwards, react to login, logout and token refresh.
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      // setTimeout: Supabase advises against calling other Supabase functions
      // directly inside this callback, because it can freeze.
      setTimeout(async () => {
        set({ user: await loadUser(session), isLoading: false })
      }, 0)
    })

    // Returned so React can stop listening when the app unmounts.
    return () => data.subscription.unsubscribe()
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      return { ok: false, message: error.message }
    }
    // No session means Supabase is waiting for the person to confirm their email.
    if (!data.session) {
      return { ok: true, message: 'Account created. Check your email to confirm it, then log in.' }
    }
    return { ok: true, message: 'Account created.' }
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return { ok: false, message: error.message }
    }
    return { ok: true, message: 'Logged in.' }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
}))