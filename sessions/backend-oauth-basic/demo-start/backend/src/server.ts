import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
