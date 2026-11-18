import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // client/ is the React app, it is not part of the backend tests.
    include: ["src/**/*.test.ts"],
  },
});
