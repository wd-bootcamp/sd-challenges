import mongoose from "mongoose";

import { requireEnv } from "./env";

export async function connectToDatabase(): Promise<void> {
  // Fail after 5 seconds instead of 30 when the database is not reachable.
  await mongoose.connect(requireEnv("MONGODB_URI"), {
    serverSelectionTimeoutMS: 5000,
  });
  // Log the database name, never the connection string (it contains the password).
  console.log(`Connected to MongoDB database "${mongoose.connection.name}"`);
}
