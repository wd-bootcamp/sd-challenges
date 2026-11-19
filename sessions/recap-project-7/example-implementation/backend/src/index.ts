import { app } from "./app";
import { connectToDatabase } from "./db";

const PORT = Number(process.env.PORT ?? 3001);

// Connect first, then accept requests.
await connectToDatabase();

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
