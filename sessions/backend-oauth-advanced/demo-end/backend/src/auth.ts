import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// NEW: connect to MongoDB. The database name comes from the end of MONGODB_URI.
const client = new MongoClient(process.env.MONGODB_URI as string);
export const db = client.db();

// The whole login in one place.
// NEW: with a database, Better Auth saves users and sessions in MongoDB.
export const auth = betterAuth({
  database: mongodbAdapter(db),
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
