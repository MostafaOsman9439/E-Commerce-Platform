import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export const Login = () => {
  const user = useAuthStore((state) => state.user)
  const signIn = useAuthStore((state) => state.signIn)
  const signUp = useAuthStore((state) => state.signUp)
  const navigate = useNavigate()

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // As soon as someone is logged in (by login, or by sign-up without email confirmation), go home.
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const result =
      mode === 'login' ? await signIn(email.trim(), password) : await signUp(email.trim(), password)

    setIsSubmitting(false)
    setMessage({ text: result.message, isError: !result.ok })
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {mode === 'login' ? 'Log in' : 'Create an account'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && (
            <p
              role={message.isError ? 'alert' : 'status'}
              className={`rounded-md p-3 text-sm ${
                message.isError ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login')
            setMessage(null)
          }}
          className="mt-4 w-full text-center text-sm text-blue-700 hover:underline"
        >
          {mode === 'login' ? 'No account? Sign up' : 'Already have an account? Log in'}
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          New accounts are customers. Admin access is granted by the site owner.
        </p>
      </div>
    </div>
  )
}
