// Read .env into process.env. A variable that is already set (terminal, hosting platform) wins.
try {
  process.loadEnvFile();
} catch {
  // No .env file: fine, the variables may come from the environment.
}

/** Reads a required environment variable and says where to set it. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env (see .env.example).`);
  }
  return value;
}
