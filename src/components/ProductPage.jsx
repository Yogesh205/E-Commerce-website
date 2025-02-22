import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: import.meta.env.VITE_UNSPLASH_KEY,
              query: "fashion",
              per_page: 12,
            },
          }
        );
        setProducts(response.data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 p-4 rounded-lg">
            {/* Image click event for navigation */}
            <img
              src={product.urls.regular}
              alt={product.alt_description}
              className="w-full h-40 object-cover rounded-md cursor-pointer"
              onClick={() =>
                navigate(`/product/${product.id}`, { state: { product } })
              }
            />
            <h3 className="mt-4 text-sm font-semibold text-center">
              {product.alt_description || "Unknown Product"}
            </h3>
            <p className="text-gray-400 text-center">$199</p>
            <button
              className="mt-4 bg-yellow-500 text-black py-1 px-3 rounded-lg w-full font-semibold text-sm"
              onClick={() =>
                addToCart({
                  id: product.id, // ✅ Added unique ID
                  name: product.alt_description || "Unknown Product",
                  price: 199,
                  image: product.urls.regular,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
