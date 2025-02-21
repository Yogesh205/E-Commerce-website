require("dotenv").config(); // Ensure dotenv loads first

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser"); // ✅ Fix for authentication cookies
const User = require("./models/User");

// Connect to MongoDB
connectDB();

const app = express();

// ✅ **Middleware**
app.use(express.json()); // Body Parser
app.use(cookieParser()); // ✅ **Fix: Handle authentication cookies**

// ✅ **CORS Configuration Fix**
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend ka origin
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// ✅ **API Routes**
app.use("/api/auth", authRoutes);
app.use("/api/v1/payment", paymentRoutes);

// ✅ **Test Route**
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ **Mistral AI Chatbot Route**
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
if (!MISTRAL_API_KEY) {
  console.error("Error: MISTRAL_API_KEY is not defined in .env file");
}

app.post("/api/v1/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!MISTRAL_API_KEY) {
      return res.status(500).json({ error: "MISTRAL_API_KEY is missing" });
    }

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-medium",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error in Mistral API call:", error.response?.data || error);
    res.status(500).json({ error: "Something went wrong with Mistral AI API" });
  }
});

// ✅ **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
