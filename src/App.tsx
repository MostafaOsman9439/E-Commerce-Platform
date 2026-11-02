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
    //  With BrowserRouter, The Url Is .../E-Commerce-Platform/cart
    //  On Refresh, The Browser Asks GitHub Pages For A Real Page At That Path
    //  And It Doesn’t Exist, So We Get A 404 Error
    //  Our Local Dev Server Avoids The Problem By Sending Index.html For Every Path
    //  Thats Why I Changed It With HashRouter, the URL is .../E-Commerce-Platform/#/cart
    //  Everything After # Never Goes To The Server
    //  So The Browser Always Loads Index.html And React Reads The Route From The Hash
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
