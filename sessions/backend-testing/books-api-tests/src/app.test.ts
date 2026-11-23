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
});
