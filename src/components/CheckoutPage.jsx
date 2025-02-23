import React from "react";

const CheckoutButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-backend-r4fm.onrender.com/api/v1/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: cartItems }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect user to Stripe checkout page
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
