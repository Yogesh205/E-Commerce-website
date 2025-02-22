import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000, // Use Render's assigned port or fallback to 3000
    host: "0.0.0.0", // Make the server accessible externally (important for deployment)
  },
});
