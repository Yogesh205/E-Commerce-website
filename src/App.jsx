import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import WelcomeScreen from "./components/WelcomeScreen";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import CategoryPage from "./components/Categorypage";
import SearchResults from "./components/SearchResults"; // ✅ SearchResults import kiya

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation();

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const hideNavFooter = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-website-backend-s4e5.onrender.com/api/auth/me",
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } catch (error) {
        console.log("User not logged in.");
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    if (!user) fetchUser();
  }, []);

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    try {
      await axios.post(
        "https://e-commerce-website-backend-s4e5.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const exists = prevCart.some((cartItem) => cartItem.id === item.id);
      return exists ? prevCart : [...prevCart, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  if (showWelcome) {
    return <WelcomeScreen onFinish={() => setShowWelcome(false)} />;
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      {!hideNavFooter && (
        <Navbar
          user={user}
          cartCount={cart.length}
          handleLogout={handleLogout}
        />
      )}

      <h2 className="text-white text-center mt-10 text-3xl">
        Welcome to HypeMart
      </h2>

      <Routes>
        <Route
          path="/"
          element={
            user ? <HomePage addToCart={addToCart} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/cart"
          element={
            user ? (
              <CartPage cart={cart} removeFromCart={removeFromCart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/category/:category"
          element={<CategoryPage addToCart={addToCart} />}
        />
        <Route
          path="/search/:query"
          element={<SearchResults />} // ✅ Search Page Added
        />
      </Routes>

      {!hideNavFooter && <Footer />}
    </div>
  );
}

export default App;
