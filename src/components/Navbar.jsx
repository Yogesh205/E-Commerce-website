import {
  FaBars,
  FaShoppingCart,
  FaTimes,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, cartCount, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold cursor-pointer">HypeMart</h1>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-1/2">
          <input
            type="text"
            placeholder="Search for products..."
            className="p-2 text-black w-full outline-none"
          />
          <button className="bg-yellow-500 p-2">
            <FaSearch size={20} className="text-black" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* User Login/Logout */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-yellow-400 cursor-pointer">
                👤 {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded"
            >
              <FaUser size={20} /> Sign in
            </button>
          )}

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart size={30} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navbar Items */}
      <div className="hidden md:flex justify-center space-x-6 bg-gray-800 p-2 mt-2">
        <a href="/" className="hover:text-gray-400">
          Home
        </a>
        <button className="hover:text-gray-400">Men</button>
        <button className="hover:text-gray-400">Women</button>
        <a href="/electronics" className="hover:text-gray-400">
          Electronics
        </a>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4 mt-2">
          <a href="/" className="block mb-2">
            Home
          </a>
          <button className="block mb-2">Men</button>
          <button className="block mb-2">Women</button>
          <a href="/electronics" className="block mb-2">
            Electronics
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
