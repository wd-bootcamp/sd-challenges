import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log(`Connected to MongoDB database "${mongoose.connection.name}"`);
}
