// Read .env into process.env. A variable that is already set (terminal, hosting platform) wins.
// This file is imported first in index.ts: auth.ts reads the GitHub secrets when it is imported.
try {
  process.loadEnvFile();
} catch {
  // No .env file: fine, the variables may come from the environment.
}
