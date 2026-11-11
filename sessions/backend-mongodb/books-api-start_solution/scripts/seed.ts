import mongoose from "mongoose";

import seed from "../src/seed.json";
import { connectToDatabase } from "../src/db";
import { BookModel } from "../src/models/Book";

// Replaces ALL books in the database with the ten books of src/seed.json.
// The ids of the seed file are dropped, MongoDB creates the _id values.
try {
  await connectToDatabase();
  await BookModel.deleteMany({});
  const books = await BookModel.insertMany(
    seed.map(({ id: _seedId, ...book }) => book)
  );
  console.log(`Seeded ${books.length} books.`);
} catch (error) {
  console.error("Seeding failed:", (error as Error).message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
