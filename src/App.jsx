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

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const [cart, setCart] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation(); // ✅ Check current route

  // ✅ Hide Navbar/Footer on these routes
  const hideNavFooter = ["/login", "/register"].includes(location.pathname);

  // ✅ Check for logged-in user on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true, // ✅ Send cookies to backend
        });

        if (response.data) {
          setUser(response.data); // ✅ Set logged-in user
          localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Store in localStorage
        }
      } catch (error) {
        console.log("User not logged in.");
        setUser(null);
        localStorage.removeItem("user"); // ✅ Remove invalid user session
      }
    };

    fetchUser();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    localStorage.removeItem("user");
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      {showWelcome ? (
        <WelcomeScreen onFinish={() => setShowWelcome(false)} />
      ) : (
        <>
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
            {/* ✅ Protected Routes - Redirect to login if user is not logged in */}
            <Route
              path="/"
              element={
                user ? (
                  <HomePage addToCart={addToCart} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/cart"
              element={
                user ? <CartPage cart={cart} /> : <Navigate to="/login" />
              }
            />

            {/* ✅ Public Routes */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          {!hideNavFooter && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
