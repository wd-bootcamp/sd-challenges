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

  // Challenge 1: create a book and read it again.
  test("POST /api/books creates a book that GET /api/books/:id returns", async () => {
    const created = await request(app)
      .post("/api/books")
      .send({ title: "Piranesi", author: "Susanna Clarke" });
    expect(created.status).toBe(201);
    expect(created.body.title).toBe("Piranesi");

    const fetched = await request(app).get(`/api/books/${created.body.id}`);
    expect(fetched.status).toBe(200);
    expect(fetched.body.title).toBe("Piranesi");
  });

  // Challenge 1: a book that does not exist.
  test("GET /api/books/:id answers 404 for a missing book", async () => {
    const response = await request(app).get("/api/books/missing");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Book not found" });
  });

  // Challenge 1: invalid input.
  test("POST /api/books without a title answers 400", async () => {
    const response = await request(app)
      .post("/api/books")
      .send({ author: "Susanna Clarke" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "title is required" });
  });
});
