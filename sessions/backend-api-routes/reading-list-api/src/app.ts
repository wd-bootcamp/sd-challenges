import express from "express";

import { booksStore } from "./store/booksStore";
import { STATUSES, type Status } from "./types";

export const app = express();

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/books", async (request, response) => {
  const { status } = request.query;

  if (status === undefined) {
    response.json(await booksStore.list());
    return;
  }

  if (typeof status !== "string" || !STATUSES.includes(status as Status)) {
    response
      .status(400)
      .json({ error: `status must be one of: ${STATUSES.join(", ")}` });
    return;
  }

  response.json(await booksStore.list({ status: status as Status }));
});

app.get("/api/books/count", async (_request, response) => {
  response.json({ count: await booksStore.count() });
});

app.use((_request, response) => {
  response.status(404).json({ error: "Not found" });
});
