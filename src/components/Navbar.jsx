import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import React, { useState } from "react";

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">YogPria Shop</h1>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>

        {/* Navbar items */}
        <div className="hidden lg:flex space-x-6">
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/men" className="hover:text-gray-400">
            Men
          </a>
          <a href="/women" className="hover:text-gray-400">
            Women
          </a>
          <a href="/electronics" className="hover:text-gray-400">
            Electronics
          </a>
        </div>

        {/* Cart icon with item count */}
        <div className="relative">
          <FaShoppingCart size={30} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-800 p-4">
          <a href="/" className="block mb-2">
            Home
          </a>
          <a href="/men" className="block mb-2">
            Men
          </a>
          <a href="/women" className="block mb-2">
            Women
          </a>
          <a href="/electronics" className="block mb-2">
            Electronics
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
