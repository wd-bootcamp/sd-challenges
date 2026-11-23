import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

import { requireEnv } from "./env";

// Better Auth talks to MongoDB with the native driver and keeps users and sessions in its own collections.
const client = new MongoClient(requireEnv("MONGODB_URI"));

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  baseURL: requireEnv("BETTER_AUTH_URL"),
  secret: requireEnv("BETTER_AUTH_SECRET"),
  trustedOrigins: [requireEnv("FRONTEND_URL")],
  socialProviders: {
    github: {
      clientId: requireEnv("GITHUB_CLIENT_ID"),
      clientSecret: requireEnv("GITHUB_CLIENT_SECRET"),
    },
  },
});
