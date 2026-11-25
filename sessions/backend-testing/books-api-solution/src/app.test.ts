import request from "supertest";
import { afterEach, describe, expect, test, vi } from "vitest";

import { app } from "./app";
import { BookModel } from "./models/Book";

const dune = {
  id: "1",
  title: "Dune",
  author: "Frank Herbert",
  status: "reading",
  rating: null,
  notes: "",
};

describe("Books API", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("GET /api/books answers 200 with the books", async () => {
    // The stub decides what the "database" answers. `as never`: the real method
    // returns a Mongoose query, the stub returns plain data.
    vi.spyOn(BookModel, "find").mockResolvedValue([dune] as never);

    const response = await request(app).get("/api/books");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([dune]);
  });

  test("GET /api/books/:id answers 200 with the book", async () => {
    vi.spyOn(BookModel, "findById").mockResolvedValue(dune as never);

    const response = await request(app).get("/api/books/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(dune);
  });

  test("GET /api/books/:id answers 404 for a missing book", async () => {
    vi.spyOn(BookModel, "findById").mockResolvedValue(null as never);

    const response = await request(app).get("/api/books/missing");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Book not found" });
  });

  test("POST /api/books answers 201 with the new book", async () => {
    const create = vi
      .spyOn(BookModel, "create")
      .mockResolvedValue(dune as never);
    const newBook = { title: "Dune", author: "Frank Herbert" };

    const response = await request(app).post("/api/books").send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(dune);
    // Proves that express.json() parsed the body and the route passed it on.
    expect(create).toHaveBeenCalledWith(newBook);
  });

  test("PUT /api/books/:id answers 200, or 404 for a missing book", async () => {
    const update = vi.spyOn(BookModel, "findByIdAndUpdate");
    update.mockResolvedValueOnce(dune as never);
    const found = await request(app)
      .put("/api/books/1")
      .send({ title: "Dune" });
    expect(found.status).toBe(200);
    expect(found.body).toEqual(dune);

    update.mockResolvedValueOnce(null as never);
    const missing = await request(app).put("/api/books/9").send({ title: "x" });
    expect(missing.status).toBe(404);
    expect(missing.body).toEqual({ error: "Book not found" });
  });

  test("DELETE /api/books/:id answers 204, then 404", async () => {
    const remove = vi.spyOn(BookModel, "findByIdAndDelete");
    remove.mockResolvedValueOnce(dune as never);
    const deleted = await request(app).delete("/api/books/1");
    expect(deleted.status).toBe(204);
    expect(deleted.body).toEqual({});

    remove.mockResolvedValueOnce(null as never);
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
    vi.spyOn(BookModel, "find").mockRejectedValue(new Error("connection lost"));

    const response = await request(app).get("/api/books");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
