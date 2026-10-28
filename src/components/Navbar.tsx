import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export const Navbar = () => {
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-gray-300 font-bold">
          Home
        </Link>
        <Link to="/cart" className="hover:text-gray-300">
          Cart
        </Link>

        {user?.role === 'admin' && (
          <Link to="/admin" className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Control Panel
          </Link>
        )}
      </div>

      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <span>
              Welcome {user.username} ({user.role})
            </span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
