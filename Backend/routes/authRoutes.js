const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const cookieParser = require("cookie-parser");

dotenv.config();
const router = express.Router();

router.use(cookieParser());

// ✅ REGISTER USER (Signup)
router.post("/register", async (req, res) => {
    try {
        console.log("🔹 Register API Hit", req.body);

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();
        console.log("✅ User registered successfully:", newUser.email);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ LOGIN USER
router.post("/login", async (req, res) => {
    try {
        console.log("🔹 Login API Hit", req.body);

        if (!process.env.JWT_SECRET) {
            throw new Error("❌ JWT_SECRET is missing");
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        console.log("✅ Login successful:", email);

        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ LOGOUT USER
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    console.log("✅ User logged out");
    res.status(200).json({ message: "Logout successful" });
});

// ✅ GET CURRENT USER (Protected Route)
router.get("/me", async (req, res) => {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ user });
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } catch (error) {
        console.error("❌ Get User Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
