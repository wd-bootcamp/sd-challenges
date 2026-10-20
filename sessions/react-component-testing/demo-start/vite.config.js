import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
  },
  test: {
    // test, expect and vi are available without imports, like jest in the unit testing session
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
