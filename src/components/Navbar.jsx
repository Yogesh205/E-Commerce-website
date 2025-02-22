import {
  FaBars,
  FaShoppingCart,
  FaTimes,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, cartCount, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  // ✅ Fix: Only update local storage when user is non-null
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
      setSearchQuery(""); // ✅ Reset input after search
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    setIsOpen(false); // ✅ Close menu on selection
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
            setIsOpen(false); // ✅ Close menu on home click
          }}
        >
          HypeMart
        </h1>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-1/2">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 text-black w-full outline-none"
          />
          <button className="bg-yellow-500 p-2" onClick={handleSearch}>
            <FaSearch size={20} className="text-black" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* User Greeting */}
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-yellow-400 cursor-pointer">
                👤 Hello, {currentUser.name}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setCurrentUser(null);
                  localStorage.removeItem("user");
                }}
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
        <button onClick={() => navigate("/")} className="hover:text-gray-400">
          Home
        </button>
        <button
          className="hover:text-gray-400"
          onClick={() => handleCategoryClick("men")}
        >
          Men
        </button>
        <button
          className="hover:text-gray-400"
          onClick={() => handleCategoryClick("women")}
        >
          Women
        </button>
        <button
          className="hover:text-gray-400"
          onClick={() => handleCategoryClick("electronics")}
        >
          Electronics
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4 mt-2">
          <button
            onClick={() => {
              navigate("/");
              setIsOpen(false); // ✅ Close menu
            }}
            className="block mb-2 hover:text-gray-400"
          >
            Home
          </button>
          <button
            className="block mb-2 hover:text-gray-400"
            onClick={() => handleCategoryClick("men")}
          >
            Men
          </button>
          <button
            className="block mb-2 hover:text-gray-400"
            onClick={() => handleCategoryClick("women")}
          >
            Women
          </button>
          <button
            className="block mb-2 hover:text-gray-400"
            onClick={() => handleCategoryClick("electronics")}
          >
            Electronics
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
