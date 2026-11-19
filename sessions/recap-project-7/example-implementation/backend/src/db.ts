import mongoose from "mongoose";

// Read .env into process.env. A variable that is already set (terminal, hosting platform) wins.
try {
  process.loadEnvFile();
} catch {
  // No .env file: fine, the variables may come from the environment.
}

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log(`Connected to MongoDB database "${mongoose.connection.name}"`);
}
