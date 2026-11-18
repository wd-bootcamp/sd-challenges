// Read .env into process.env. A variable that is already set (terminal, hosting platform) wins.
// Imported first by every file that reads process.env at import time (app.ts, db.ts).
try {
  process.loadEnvFile();
} catch {
  // No .env file: fine, the variables may come from the environment.
}
