// Read .env into process.env. A variable that is already set wins.
try {
  process.loadEnvFile();
} catch {
  // No .env file: fine.
}

export const E2E_MONGODB_URI =
  process.env.E2E_MONGODB_URI ?? "mongodb://127.0.0.1:27017/reading-list-e2e";

/** Throws unless the database name ends with "-e2e". Protects the real data. */
export function assertE2eDatabase(uri: string): void {
  const name = new URL(uri).pathname.replace("/", "");
  if (!name.endsWith("-e2e")) {
    throw new Error(
      `E2E_MONGODB_URI points at the database "${name}". The name must end with "-e2e".`
    );
  }
}
