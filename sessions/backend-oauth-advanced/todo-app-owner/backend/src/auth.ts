import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Better Auth talks to MongoDB with the native driver (the todos keep using mongoose).
// It saves users and sessions in its own collections: user, account, session, verification.
const client = new MongoClient(process.env.MONGODB_URI as string);

// The whole login in one place.
export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: {
    github: {
      // "as string": we tell TypeScript that this value is in .env
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
