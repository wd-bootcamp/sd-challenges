import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // The React app in client/ has its own configuration.
    include: ["src/**/*.test.ts"],
    // Tests never use the .env of the student.
    env: { MONGODB_URI: "mongodb://127.0.0.1:1/reading-list-test" },
  },
});
