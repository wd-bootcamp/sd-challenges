import mongoose from "mongoose";

// Read .env into process.env. A variable that is already set (terminal, hosting platform) wins.
try {
  process.loadEnvFile();
} catch {
  // No .env file: fine, the variables may come from the environment.
}

export async function connectToDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Set it in .env or as an environment variable."
    );
  }
  // Fail after 5 seconds instead of 30 when the database is not reachable.
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  // Log the database name, never the connection string (it contains the password).
  console.log(`Connected to MongoDB database "${mongoose.connection.name}"`);
}
