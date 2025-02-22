import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: import.meta.env.VITE_UNSPLASH_KEY,
              query: query,
              per_page: 12,
            },
          }
        );
        setProducts(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading)
    return <p className="text-center text-white mt-20">Searching...</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 pt-24">
      <h2 className="text-3xl font-bold text-center mb-6">
        Search Results for "{query}"
      </h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={product.urls.regular}
                alt={product.alt_description}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-4 text-sm font-semibold text-center">
                {product.alt_description || "Product"}
              </h3>
              <p className="text-gray-400 text-center">
                ₹{Math.floor(Math.random() * 5000) + 500}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
