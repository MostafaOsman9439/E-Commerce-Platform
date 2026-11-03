import { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminDashboard } from './pages/AdminDashboard'
import { useProductStore } from './store/useProductStore'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Login } from './pages/Login'

export function App() {
  const fetchProductsAndCategories = useProductStore((state) => state.fetchProductsAndCategories)

  useEffect(() => {
    fetchProductsAndCategories()
  }, [fetchProductsAndCategories])

  return (
    // HashRouter keeps the route after the "#" (example: /#/cart), so the server only sees
    // the base URL. BrowserRouter would ask GitHub Pages for /cart on refresh, and that
    // page doesn't exist there, which caused the 404.
    <Router>
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
