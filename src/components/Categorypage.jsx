import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CategoryPage({ addToCart }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return; // Prevents fetching if category is undefined

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: import.meta.env.VITE_UNSPLASH_KEY,
              query: category,
              per_page: 12,
            },
          }
        );
        console.log("API Response:", response.data);

        setProducts(response.data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <p className="text-center text-white mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-20">
        No products found for "{category}".
      </p>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 pt-24">
      <h2 className="text-3xl font-bold text-center mb-6">
        {category.toUpperCase()}
      </h2>
      <p className="text-gray-400 text-center mb-6">
        Showing products for "{category}"
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-4 rounded-lg flex flex-col items-center"
          >
            <img
              src={product.urls.regular}
              alt={product.alt_description}
              className="w-full h-40 object-cover rounded-md cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            />
            <h3 className="mt-4 text-sm font-semibold text-center">
              {product.alt_description || "Product"}
            </h3>
            <p className="text-gray-400 text-center">
              ₹{Math.floor(Math.random() * 5000) + 500}
            </p>
            <button
              className="mt-auto bg-yellow-500 text-black py-2 px-4 rounded-lg w-full font-semibold text-sm"
              onClick={() =>
                addToCart({
                  name: product.alt_description || "Product",
                  price: Math.floor(Math.random() * 5000) + 500,
                  image: product.urls.regular,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/3 shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>
            <img
              src={selectedProduct.urls.regular}
              alt={selectedProduct.alt_description}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-4 text-center">
              {selectedProduct.alt_description || "Product"}
            </h2>
            <p className="text-gray-400 text-center mt-2">
              Price: ₹{Math.floor(Math.random() * 5000) + 500}
            </p>
            <button
              className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded-lg w-full font-semibold"
              onClick={() => {
                addToCart({
                  name: selectedProduct.alt_description || "Product",
                  price: Math.floor(Math.random() * 5000) + 500,
                  image: selectedProduct.urls.regular,
                });
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
