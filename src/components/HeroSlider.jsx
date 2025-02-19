import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HeroSlider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "4G-E-oO1VVHULeGazgn_iqLFS8L2H4t2Ch-cnbxnltc", // Replace with your Unsplash API Key
              query: "shopping sale", // Search query for hero section
              per_page: 5,
            },
          }
        );

        if (response.data.results) {
          setImages(response.data.results.map((img) => img.urls.regular));
        }
      } catch (error) {
        console.error("Error fetching hero images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: true,
    prevArrow: (
      <FaArrowLeft className="text-white text-2xl absolute left-4 top-1/2 z-10 cursor-pointer" />
    ),
    nextArrow: (
      <FaArrowRight className="text-white text-2xl absolute right-4 top-1/2 z-10 cursor-pointer" />
    ),
  };

  return (
    <div className="w-full mx-auto mt-4">
      {loading ? (
        <p className="text-white text-center">Loading Images...</p>
      ) : (
        <Slider {...settings}>
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full h-[200px] flex justify-center items-center"
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HeroSlider;
