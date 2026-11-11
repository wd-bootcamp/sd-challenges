import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // The React app in client/ has its own tests and its own configuration.
    include: ["src/**/*.test.ts"],
  },
});
