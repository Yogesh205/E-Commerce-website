import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QtsxcBiqz1iV3SAmMcjRjN4gn272MLGALUL5iRl9hyrwSEvKm51xpMCytzavEt4iOAzyd84VcefMs2R3Rw8VNnx00aDn4F3ET"
);

function StripeCheckout({ cart, shippingInfo }) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "sk_test_51QtsxcBiqz1iV3SAlbbII3p5b962jxQiFPMENGWCm9GnOuzazTKPhQBiOii1DupXRdZxCXZXKegTfE7J4tUCR6tC00xQJ9ee20",
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );
  };
  if (error) {
    console.log("Payment failed:", error);
  } else {
    console.log("Payment successful:", paymentIntent);
  }
}

return (
  <div>
    <CardElement />
    <button
      onClick={handlePayment}
      disabled={!stripe}
      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
    >
      Pay Now
    </button>
  </div>
);

export default StripeCheckout;
