import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import FloatingChatbot from "./Chatbot";
import Chatbot from "./Chatbot";

function HomePage({ addToCart }) {
  const [menImages, setMenImages] = useState([]);
  const [womenImages, setWomenImages] = useState([]);
  const [electronicsImages, setElectronicsImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch images from Unsplash API based on category
    const fetchImages = async () => {
      try {
        // Fetch Men's images
        const menResponse = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "4G-E-oO1VVHULeGazgn_iqLFS8L2H4t2Ch-cnbxnltc", // Replace with your Unsplash API key
              query: "men fashion", // Search for men's fashion images
              per_page: 6,
            },
          }
        );
        setMenImages(menResponse.data.results);

        // Fetch Women's images
        const womenResponse = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "4G-E-oO1VVHULeGazgn_iqLFS8L2H4t2Ch-cnbxnltc", // Replace with your Unsplash API key
              query: "women fashion", // Search for women's fashion images
              per_page: 6,
            },
          }
        );
        setWomenImages(womenResponse.data.results);

        // Fetch Electronics images
        const electronicsResponse = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "4G-E-oO1VVHULeGazgn_iqLFS8L2H4t2Ch-cnbxnltc", // Replace with your Unsplash API key
              query: "electronics", // Search for electronics images
              per_page: 6,
            },
          }
        );
        setElectronicsImages(electronicsResponse.data.results);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    // Fetch images when the component is mounted
    fetchImages();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleAddToCart = (item) => {
    const itemWithImage = {
      name: item.name, // Example product name
      price: item.price, // Example price
      image: item.urls.regular, // Image URL for the item
    };

    addToCart(itemWithImage); // Add item with image to the cart
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-6">
      <HeroSlider />
      <Chatbot />

      {/* Men Section */}
      <section className="my-10">
        <h2 className="text-3xl text-white font-semibold mb-6">
          Men's Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menImages.map((image) => (
            <div key={image.id} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={image.urls.regular} // Image from Unsplash API
                alt="Men's Fashion"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-white mt-4">Product Name</h3>
              <p className="text-gray-400">$199</p>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
                onClick={() =>
                  handleAddToCart({
                    name: "Men's Fashion", // Example product name
                    price: 199, // Example price
                    urls: { regular: image.urls.regular }, // Image URL for the item
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Women Section */}
      <section className="my-10">
        <h2 className="text-3xl text-white font-semibold mb-6">
          Women's Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {womenImages.map((image) => (
            <div key={image.id} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={image.urls.regular}
                alt="Women's Fashion"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-white mt-4">Product Name</h3>
              <p className="text-gray-400">$159</p>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
                onClick={() =>
                  handleAddToCart({
                    name: "Women's Fashion", // Example product name
                    price: 159, // Example price
                    urls: { regular: image.urls.regular }, // Image URL for the item
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Electronics Section */}
      <section className="my-10">
        <h2 className="text-3xl text-white font-semibold mb-6">
          Electronics Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {electronicsImages.map((image) => (
            <div key={image.id} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={image.urls.regular}
                alt="Electronics"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-white mt-4">Product Name</h3>
              <p className="text-gray-400">$299</p>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
                onClick={() =>
                  handleAddToCart({
                    name: "Electronics", // Example product name
                    price: 299, // Example price
                    urls: { regular: image.urls.regular }, // Image URL for the item
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
