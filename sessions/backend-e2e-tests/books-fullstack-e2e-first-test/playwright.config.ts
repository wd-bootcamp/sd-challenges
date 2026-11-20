import { defineConfig } from "@playwright/test";

import { assertE2eDatabase, E2E_MONGODB_URI } from "./e2e/database";

assertE2eDatabase(E2E_MONGODB_URI);

// Not the dev ports (3001 backend, 5173 client). The client port must be in the CORS list of
// the backend (3000 and 5173 are), and the dev client uses 5173, so the tests use 3000.
const API_PORT = 3101;
const WEB_PORT = 3000;

export default defineConfig({
  testDir: "./e2e",
  workers: 1,
  reporter: "list",
  use: { baseURL: `http://localhost:${WEB_PORT}`, trace: "retain-on-failure" },
  webServer: [
    {
      // The backend, connected to the test database.
      command: "npm start",
      url: `http://localhost:${API_PORT}/api/health`,
      reuseExistingServer: false,
      env: { PORT: String(API_PORT), MONGODB_URI: E2E_MONGODB_URI },
    },
    {
      // The React app, talking to the test backend.
      command: `npm run dev -- --port ${WEB_PORT} --strictPort`,
      cwd: "client",
      url: `http://localhost:${WEB_PORT}`,
      reuseExistingServer: false,
      env: { VITE_API_URL: `http://localhost:${API_PORT}/api` },
    },
  ],
});
