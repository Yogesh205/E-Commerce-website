import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Explicitly bind server to 0.0.0.0
    allowedHosts: ["e-commerce-website-1-z8s1.onrender.com"], // Allowed Hosts
  },
});
