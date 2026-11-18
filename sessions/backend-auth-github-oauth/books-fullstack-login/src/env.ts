/** Reads a required environment variable when it is needed, and says where to set it. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env (see .env.example).`);
  }
  return value;
}
