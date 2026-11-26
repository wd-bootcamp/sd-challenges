import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Every request to /api goes to our Express server.
    // For the browser, page and API are one address: no CORS needed.
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
