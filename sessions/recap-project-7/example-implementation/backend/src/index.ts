import mongoose from "mongoose";

import { createApp } from "./app.js";
import { config } from "./config.js";

await mongoose.connect(config.mongodbUri);
console.log("Connected to MongoDB");

createApp().listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}/api`);
});
