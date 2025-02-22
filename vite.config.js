import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // Set the port to 4000 (or any other port Render uses)
    host: "0.0.0.0", // Make the server accessible externally (important for deployment)
  },
});
