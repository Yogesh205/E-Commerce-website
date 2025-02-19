import React from "react";
import CheckoutButton from "./CheckoutButton";

function CartPage({ cart }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-white font-semibold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-white">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cart.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
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
