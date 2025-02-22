import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSlider from "./HeroSlider";
import Chatbot from "./Chatbot";
import { FaClock } from "react-icons/fa";

function HomePage({ addToCart }) {
  const [menImages, setMenImages] = useState([]);
  const [womenImages, setWomenImages] = useState([]);
  const [electronicsImages, setElectronicsImages] = useState([]);
  const [timer, setTimer] = useState(3600); // 1-hour countdown for deals
  const [selectedProduct, setSelectedProduct] = useState(null); // 🛒 Modal ke liye

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const categories = [
          { name: "men fashion", setter: setMenImages },
          { name: "women fashion", setter: setWomenImages },
          { name: "electronics", setter: setElectronicsImages },
        ];

        for (const category of categories) {
          const response = await axios.get(
            "https://api.unsplash.com/search/photos",
            {
              params: {
                client_id: "4G-E-oO1VVHULeGazgn_iqLFS8L2H4t2Ch-cnbxnltc",
                query: category.name,
                per_page: 6,
              },
            }
          );
          category.setter(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <HeroSlider />
      <Chatbot />

      {/* 📢 Banner Ads & Promotions */}
      <div className="container mx-auto my-6 p-4">
        <div className="bg-yellow-500 text-black p-4 text-center text-xl font-bold rounded-lg shadow-lg">
          Get 50% Off on Electronics! Limited Time Offer!
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* 🔥 Trending Deals Section */}
        <h2 className="text-2xl font-semibold my-6 text-center">
          Trending Deals
        </h2>
        <div className="bg-red-500 text-white p-4 text-center text-lg font-semibold rounded-lg">
          <FaClock className="inline-block mr-2" /> Deal of the Day - Time Left:{" "}
          {`${Math.floor(timer / 60)}:${timer % 60}`}
        </div>

        {[
          { title: "Men's Collection", data: menImages, price: 199 },
          { title: "Women's Collection", data: womenImages, price: 159 },
          {
            title: "Electronics Collection",
            data: electronicsImages,
            price: 299,
          },
        ].map((section, index) => (
          <section key={index} className="my-10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2 text-center">
              {section.title}
            </h2>
            <div className="flex overflow-x-auto gap-6 scrollbar-hide">
              {section.data.map((image) => (
                <div
                  key={image.id}
                  className="bg-gray-800 p-4 rounded-lg min-w-[200px] cursor-pointer"
                  onClick={() =>
                    setSelectedProduct({
                      id: image.id,
                      title: section.title,
                      price: section.price,
                      urls: image.urls,
                    })
                  }
                >
                  <img
                    src={image.urls.regular}
                    alt={section.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-sm font-semibold text-center">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 text-center">${section.price}</p>
                  <button
                    className="mt-4 bg-yellow-500 text-black py-1 px-3 rounded-lg w-full font-semibold text-sm"
                    onClick={() =>
                      addToCart({
                        id: image.id,
                        name: section.title,
                        price: section.price,
                        urls: { regular: image.urls.regular },
                      })
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 🖼 Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

export default HomePage;

// 🎯 Product Modal Component
function ProductModal({ product, onClose, addToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-96 relative shadow-lg">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl bg-red-600 rounded-full px-2 py-1 text-white z-50"
          style={{ zIndex: 9999 }} // ✅ High z-index
        >
          ✖
        </button>

        <img
          src={product.urls.regular}
          alt="Product"
          className="w-full h-60 object-cover rounded-lg"
        />

        <h2 className="text-lg font-semibold mt-4">{product.title}</h2>
        <p className="text-gray-400">${product.price}</p>
        <p className="text-sm mt-2">
          This is a high-quality product with amazing reviews!
        </p>

        <div className="mt-3">
          <strong>⭐ 4.5/5 (120 Reviews)</strong>
        </div>

        <button
          className="mt-4 bg-yellow-500 text-black py-2 px-3 rounded-lg w-full font-semibold text-sm"
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.title,
              price: product.price,
              urls: { regular: product.urls.regular },
            });
            onClose();
          }}
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}
