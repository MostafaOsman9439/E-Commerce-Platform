import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { useCartStore } from './store/useCartStore';

export function App() {
  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar cartItemsCount={cartItemsCount} userRole="customer" />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;