import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["e-commerce-website-1-z8s1.onrender.com"], // Update to your new host
  },
});
