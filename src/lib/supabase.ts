import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fail loudly if the keys are missing, so the problem is obvious.
if (!url || !key) {
  throw new Error('Missing Supabase environment variables. Check your .env.local file.')
}

// The anon key is safe to ship in the browser because Row Level Security
// in the database decides what each user is allowed to do.
export const supabase = createClient(url, key)
