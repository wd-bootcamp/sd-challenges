import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Only the unit tests of the API. client/ and the browser tests in e2e/ are not picked up.
    include: ["src/**/*.test.ts"],
  },
});
