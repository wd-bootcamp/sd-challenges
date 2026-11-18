import request from "supertest";
import { describe, expect, test, vi } from "vitest";

import { app } from "./app";

// Replace the MongoDB store with the in-memory store. No database in this file.
vi.mock("./store/booksStore", async (importOriginal) => {
  const original = await importOriginal<typeof import("./store/booksStore")>();
  return { ...original, booksStore: original.createBooksStore() };
});

describe("Books API", () => {
  test("GET /api/books returns the books", async () => {
    const response = await request(app).get("/api/books"); // await is required
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
