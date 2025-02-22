// src/services/api.js

import axios from "axios";

const apiUrl = "https://e-commerce-website-backend-s4e5.onrender.com/api/";

// Example: Fetch products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Example: User Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Example: User Signup
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};
