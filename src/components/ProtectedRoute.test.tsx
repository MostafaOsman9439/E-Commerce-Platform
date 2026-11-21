import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuthStore } from '../store/useAuthStore'

// Renders the protected page at "/secret", with simple pages to land on after a redirect.
const renderRoute = (requiredRole?: 'customer' | 'admin') => {
  render(
    <MemoryRouter initialEntries={['/secret']}>
      <Routes>
        <Route
          path="/secret"
          element={
            <ProtectedRoute requiredRole={requiredRole}>
              <p>Secret content</p>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<p>Login page</p>} />
        <Route path="/" element={<p>Home page</p>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isLoading: false })
  })

  it('redirects to home when the role does not match', () => {
    useAuthStore.setState({ user: { id: '1', email: 'a@b.com', role: 'customer' } })
    renderRoute('admin')

    expect(screen.getByText('Home page')).toBeInTheDocument()
  })

  it('shows the content when the role matches', () => {
    useAuthStore.setState({ user: { id: '1', email: 'a@b.com', role: 'admin' } })
    renderRoute('admin')

    expect(screen.getByText('Secret content')).toBeInTheDocument()
  })

  it('shows a loading message while the session is being checked', () => {
    useAuthStore.setState({ isLoading: true })
    renderRoute()

    expect(screen.getByRole('status')).toHaveTextContent('Checking your session...')
  })

  it('redirects to the login page when nobody is logged in', () => {
    renderRoute()

    expect(screen.getByText('Login page')).toBeInTheDocument()
  })
})
