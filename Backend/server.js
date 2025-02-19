require("dotenv").config(); // Ensure dotenv loads first

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

// Payment Routes
app.use("/api/v1/payment", paymentRoutes);

// Mistral AI Chatbot Route
app.post("/api/v1/chat", async (req, res) => {
  try {
    const { message } = req.body;

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
