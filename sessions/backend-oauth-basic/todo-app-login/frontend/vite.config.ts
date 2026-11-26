import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // The GitHub callback URL uses this port, so do not change it.
    port: 5173,
    strictPort: true,
    // Every request to /api goes to the backend.
    // For the browser, page and API are one address: the login cookie travels without CORS settings.
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
