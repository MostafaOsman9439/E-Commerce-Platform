import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminDashboard } from './pages/AdminDashboard'
import { useProductStore } from './store/useProductStore'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Login } from './pages/Login'
import { useEffect } from 'react'

export function App() {
  const fetchProductsAndCategories = useProductStore((state) => state.fetchProductsAndCategories)

  useEffect(() => {
    fetchProductsAndCategories()
  }, [fetchProductsAndCategories])

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
