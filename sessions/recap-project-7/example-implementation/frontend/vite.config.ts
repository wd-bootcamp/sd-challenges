import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // The backend allows exactly this origin (CORS), so do not change the port.
    port: 5173,
    strictPort: true,
  },
});
