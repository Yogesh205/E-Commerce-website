import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    // ✅ Debugging: Console log email & password before sending request
    console.log("Sending Login Request:", { email, password });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" }, // ✅ Fix: Added Content-Type header
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );

      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);

      setSuccessMessage("✅ Login Successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "❌ Login Failed! Invalid Credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>

        {/* Success & Error Messages */}
        {successMessage && (
          <p className="text-green-400 mb-2">{successMessage}</p>
        )}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 rounded text-black outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 rounded text-black outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 w-full p-2 rounded mt-2 font-bold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* New User Registration Section */}
        <div className="mt-4 text-center">
          <p className="text-gray-300">New User? Register now!</p>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 px-4 py-2 rounded text-white inline-block mt-2 hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
