import request from "supertest";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { app } from "./app";

// The routes call BookModel. Here it is replaced by stubs, so no test needs a database.
// vi.hoisted runs before the (moved to the top) vi.mock, so the factory can use `model`.
const model = vi.hoisted(() => ({
  find: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  findByIdAndUpdate: vi.fn(),
  findByIdAndDelete: vi.fn(),
  countDocuments: vi.fn(),
}));

// Keep everything of the real module (`toBook`), swap only `BookModel`.
vi.mock("./models/Book", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./models/Book")>()),
  BookModel: model,
}));

const dune = {
  id: "1",
  title: "Dune",
  author: "Frank Herbert",
  status: "reading",
  rating: null,
  notes: "",
};

describe("Books API", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("GET /api/books answers 200 with the books", async () => {
    model.find.mockResolvedValue([dune]);

    const response = await request(app).get("/api/books");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([dune]);
  });

  test("GET /api/books/:id answers 200 with the book", async () => {
    model.findById.mockResolvedValue(dune);

    const response = await request(app).get("/api/books/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(dune);
  });

  test("GET /api/books/:id answers 404 for a missing book", async () => {
    model.findById.mockResolvedValue(null);

    const response = await request(app).get("/api/books/missing");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Book not found" });
  });

  test("POST /api/books answers 201 with the new book", async () => {
    model.create.mockResolvedValue(dune);
    const newBook = { title: "Dune", author: "Frank Herbert" };

    const response = await request(app).post("/api/books").send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(dune);
    // Proves that express.json() parsed the body and the route passed it on.
    expect(model.create).toHaveBeenCalledWith(newBook);
  });

  test("PUT /api/books/:id answers 200, or 404 for a missing book", async () => {
    model.findByIdAndUpdate.mockResolvedValueOnce(dune);
    const found = await request(app)
      .put("/api/books/1")
      .send({ title: "Dune" });
    expect(found.status).toBe(200);
    expect(found.body).toEqual(dune);

    model.findByIdAndUpdate.mockResolvedValueOnce(null);
    const missing = await request(app).put("/api/books/9").send({ title: "x" });
    expect(missing.status).toBe(404);
    expect(missing.body).toEqual({ error: "Book not found" });
  });

  test("DELETE /api/books/:id answers 204, then 404", async () => {
    model.findByIdAndDelete.mockResolvedValueOnce(dune);
    const deleted = await request(app).delete("/api/books/1");
    expect(deleted.status).toBe(204);
    expect(deleted.body).toEqual({});

    model.findByIdAndDelete.mockResolvedValueOnce(null);
    const again = await request(app).delete("/api/books/1");
    expect(again.status).toBe(404);
  });

  test("a body that is not valid JSON answers 400", async () => {
    const response = await request(app)
      .post("/api/books")
      .set("Content-Type", "application/json")
      .send("{ broken");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid JSON body" });
  });

  test("an error in the database becomes a 500 without details", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // the error handler logs
    model.find.mockRejectedValue(new Error("connection lost"));

    const response = await request(app).get("/api/books");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
