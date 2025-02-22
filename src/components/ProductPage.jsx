import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch product details from your backend
        const response = await axios.get(
          "https://e-commerce-website-backend-s4e5.onrender.com/api/products"
        );
        setProducts(response.data);

        // Fetch images from Unsplash for the products
        const imageResponse = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: import.meta.env.VITE_UNSPLASH_KEY,
              query: "fashion", // You can change this query based on your categories
              per_page: response.data.length, // Fetch the same number of images as products
            },
          }
        );
        setImages(imageResponse.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={product._id} className="bg-gray-800 p-4 rounded-lg">
            {/* Use Unsplash image for the product */}
            <img
              src={images[index]?.urls.regular} // Get image from Unsplash response
              alt={product.name || "Product Image"}
              className="w-full h-40 object-cover rounded-md cursor-pointer"
              onClick={() =>
                navigate(`/product/${product._id}`, { state: { product } })
              }
            />
            <h3 className="mt-4 text-sm font-semibold text-center">
              {product.name || "Unknown Product"}
            </h3>
            <p className="text-gray-400 text-center">${product.price}</p>
            <button
              className="mt-4 bg-yellow-500 text-black py-1 px-3 rounded-lg w-full font-semibold text-sm"
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.name || "Unknown Product",
                  price: product.price,
                  image: images[index]?.urls.regular, // Use the image URL from Unsplash
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
