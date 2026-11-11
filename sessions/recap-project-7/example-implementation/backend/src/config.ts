import { config as loadEnv } from "dotenv";

loadEnv({ quiet: true });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env and set it.`
    );
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 3001),
  mongodbUri: required("MONGODB_URI"),
};
