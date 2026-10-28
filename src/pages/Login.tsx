import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [role, setRole] = useState<'customer' | 'admin'>('customer')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(username.trim(), role)
    navigate(role === 'admin' ? '/admin' : '/')
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Demo access</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a display name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Demo view</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'customer' | 'admin')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin dashboard</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Enter demo
          </button>
        </form>

        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900" role="note">
          Demo only: this does not create an account or verify access. Anyone can choose the admin view.
        </div>
      </div>
    </div>
  )
}
