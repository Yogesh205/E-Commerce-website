import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from all hosts (if needed, change to specific domains)
    allowedHosts: ["e-commerce-website-1-z8s1.onrender.com"], // Add your domain here
  },
});
