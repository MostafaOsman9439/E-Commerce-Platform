import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'

export const Navbar = () => {
  const { user, logout } = useAuthStore()
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

  return (
    <nav className="bg-gray-800 px-4 py-3 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Link to="/" className="rounded px-2 py-1 font-bold text-white transition hover:bg-gray-700">
            Home
          </Link>

          <Link to="/cart" className="inline-flex items-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-gray-200 transition hover:bg-gray-700 hover:text-white">
            Cart
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user?.role === 'admin' && (
            <Link to="/admin" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700">
              Control Panel
            </Link>
          )}
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-200 sm:inline">
                Welcome {user.username} ({user.role})
              </span>
              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
