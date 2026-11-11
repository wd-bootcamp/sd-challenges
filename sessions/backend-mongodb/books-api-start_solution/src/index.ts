import { app } from "./app";
import { connectToDatabase } from "./db";

const port = Number(process.env.PORT) || 3001;

try {
  // Connect first, then accept requests.
  await connectToDatabase();
} catch (error) {
  console.error("Could not connect to MongoDB:", (error as Error).message);
  process.exit(1);
}

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
