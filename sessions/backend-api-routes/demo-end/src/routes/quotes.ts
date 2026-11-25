import { randomUUID } from "node:crypto";
import { Router } from "express";

import { quotes } from "../quotes";
import type { Quote } from "../types";

export const quotesRouter = Router();

// GET /api/quotes and GET /api/quotes?author=kent
quotesRouter.get("/", (request, response) => {
  const { author } = request.query;

  if (typeof author === "string") {
    const needle = author.trim().toLowerCase();
    response.json(
      quotes.filter((quote) => quote.author.toLowerCase().includes(needle))
    );
    return;
  }
  response.json(quotes);
});

// GET /api/quotes/:id
quotesRouter.get("/:id", (request, response) => {
  const quote = quotes.find((item) => item.id === request.params.id);

  if (!quote) {
    response.status(404).json({ error: "Quote not found" });
    return;
  }
  response.json(quote);
});

// POST /api/quotes
quotesRouter.post("/", (request, response) => {
  const quote: Quote = { ...request.body, id: randomUUID() };
  quotes.push(quote);
  response.status(201).json(quote);
});

// DELETE /api/quotes/:id
quotesRouter.delete("/:id", (request, response) => {
  const index = quotes.findIndex((item) => item.id === request.params.id);

  if (index === -1) {
    response.status(404).json({ error: "Quote not found" });
    return;
  }
  quotes.splice(index, 1);
  response.status(204).end();
});
