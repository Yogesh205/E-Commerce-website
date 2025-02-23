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
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity || 1, // Ensure quantity is always present
            })),
          }),
        }
      );

      const data = await response.json();
      console.log("Checkout Response:", data); // Debugging

      if (response.ok) {
        window.location.href = data.url;
      } else {
        console.error("Checkout session creation failed:", data.error);
        alert("Payment failed: " + data.error);
      }
    } catch (error) {
      console.error("Error in checkout:", error);
      alert("Something went wrong, please try again!");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 text-white p-3 rounded-md mt-4"
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
