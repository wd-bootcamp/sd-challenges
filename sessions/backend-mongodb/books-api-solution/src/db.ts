import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env and fill it in."
    );
  }
  // Fail after 5 seconds instead of 30 when the database is not reachable.
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  // Log the database name, never the connection string (it contains the password).
  console.log(`Connected to MongoDB database "${mongoose.connection.name}"`);
}
