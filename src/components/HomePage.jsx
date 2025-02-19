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
                  className="bg-gray-800 p-4 rounded-lg min-w-[200px]"
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
    </div>
  );
}

export default HomePage;
