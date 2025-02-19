require("dotenv").config(); // Ensure dotenv loads first

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Payment Routes
app.use("/api/v1/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
