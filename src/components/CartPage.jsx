import React from "react";
import { FaTimes } from "react-icons/fa";
import CheckoutButton from "./CheckoutButton";

function CartPage({ cart, removeFromCart }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mx-auto p-6 pt-24">
      <h2 className="text-3xl text-white font-semibold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-white">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cart.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg relative">
              {/* Product Image */}
              <img
                src={item.urls?.regular || "default-image.jpg"} // Safe access: fallback image
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />

              {/* Remove Button (❌) */}
              <button
                onClick={() => removeFromCart(item.id)} // Ensure we're passing the correct item id
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTimes size={20} />
              </button>

              <h3 className="text-white mt-4">{item.name}</h3>
              <p className="text-gray-400">${item.price}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-white">
        <h3 className="text-2xl">Total: ${calculateTotal()}</h3>

        {/* Checkout Button */}
        <CheckoutButton cartItems={cart} />
      </div>
    </div>
  );
}

export default CartPage;
