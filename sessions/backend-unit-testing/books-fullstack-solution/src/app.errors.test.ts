import request from "supertest";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { createApp } from "./app";
import { createBooksStore, type BooksStore } from "./store/booksStore";

// Optional challenge 1: the seam. createApp(store) gives every test a fresh store, so no vi.mock and no shared state.
let store: BooksStore;
let app: ReturnType<typeof createApp>;

beforeEach(() => {
  store = createBooksStore();
  app = createApp(store);
});

const validBook = { title: "Piranesi", author: "Susanna Clarke" };

describe("errors and the other routes", () => {
  test("an invalid JSON body answers 400", async () => {
    const response = await request(app)
      .post("/api/books")
      .set("Content-Type", "application/json")
      .send("{ not json");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid JSON body" });
  });

  test("a 400 stores nothing", async () => {
    const before = await store.count();
    await request(app).post("/api/books").send({ author: "A" });
    expect(await store.count()).toBe(before);
  });

  test("an unknown status filter answers 400", async () => {
    const response = await request(app).get("/api/books?status=finished");
    expect(response.status).toBe(400);
  });

  test("the list has the seed books and /count agrees", async () => {
    const list = await request(app).get("/api/books");
    const count = await request(app).get("/api/books/count");
    expect(list.body).toHaveLength(10);
    expect(count.body).toEqual({ count: 10 });
  });

  test("PUT replaces a book", async () => {
    const created = await request(app).post("/api/books").send(validBook);
    const response = await request(app)
      .put(`/api/books/${created.body.id}`)
      .send({ ...validBook, status: "done", rating: 5 });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: created.body.id,
      status: "done",
      rating: 5,
    });
  });

  test("PUT on a missing book answers 404", async () => {
    const response = await request(app)
      .put("/api/books/missing")
      .send(validBook);
    expect(response.status).toBe(404);
  });

  test("DELETE removes a book, a second DELETE answers 404", async () => {
    const created = await request(app).post("/api/books").send(validBook);
    const first = await request(app).delete(`/api/books/${created.body.id}`);
    const second = await request(app).delete(`/api/books/${created.body.id}`);
    expect(first.status).toBe(204);
    expect(second.status).toBe(404);
  });

  test("a store that throws becomes a 500 without details", async () => {
    // The error handler logs the error. Silence it in this test.
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const failingStore: BooksStore = {
      ...store,
      list: async () => {
        throw new Error("secret detail");
      },
    };
    const response = await request(createApp(failingStore)).get("/api/books");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
    consoleError.mockRestore();
  });
});
