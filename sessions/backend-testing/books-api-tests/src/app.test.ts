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
});
