import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [cart, setCart] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <Router>
      <div className="bg-gray-950 min-h-screen">
        {showWelcome ? (
          <WelcomeScreen onFinish={() => setShowWelcome(false)} />
        ) : (
          <>
            <Navbar cartCount={cart.length} />
            <h2 className="text-white text-center mt-10 text-3xl">
              Welcome to YogPriya Shop
            </h2>
            <Routes>
              <Route path="/" element={<HomePage addToCart={addToCart} />} />
              <Route path="/cart" element={<CartPage cart={cart} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
