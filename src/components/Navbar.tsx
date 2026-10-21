import React from 'react'
import { User } from '../types'

interface NavbarProps {
  cartItemsCount: number
  userRole?: User['role'] // Customer / Admin
}

export const Navbar = ({ cartItemsCount, userRole }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-blue-600">Mini Store</div>

      <div className="flex items-center gap-6 font-medium">
        <a href="#" className="hover:text-blue-600 transition">
          Home Page
        </a>

        {userRole === 'admin' && (
          <a href="#" className="hover:text-blue-600 transition text-amber-600">
            Control Panel
          </a>
        )}

        <div className="relative cursor-pointer">
          <span className="hover:text-blue-600 transition">Cart</span>
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}
