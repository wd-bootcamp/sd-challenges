import cors from "cors";
import express from "express";

export const app = express();

// The React app runs on another origin (http://localhost:5173), so the browser needs CORS headers.
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

// Issue 2: write the todo routes here, below the health route. The contract is in docs/api-contract.md.
