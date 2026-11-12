import { afterEach, describe, expect, it, vi } from "vitest";

import { ApiError, createBook, deleteBook, listBooks } from "./api";

function mockFetch(response: Response | Error) {
  const fn = vi.fn(async (_input: string, _init?: RequestInit) => {
    if (response instanceof Error) throw response;
    return response;
  });
  vi.stubGlobal("fetch", fn);
  return fn;
}

afterEach(() => vi.unstubAllGlobals());

describe("api", () => {
  it("sends the filters as query parameters", async () => {
    const fn = mockFetch(Response.json([]));
    await listBooks({ status: "reading", q: "  dune " });
    expect(fn.mock.calls[0]?.[0]).toBe("/api/books?status=reading&q=dune");
  });

  it("sends no query string without filters", async () => {
    const fn = mockFetch(Response.json([]));
    await listBooks({ status: "all", q: "" });
    expect(fn.mock.calls[0]?.[0]).toBe("/api/books");
  });

  it("uses the error message of the backend", async () => {
    mockFetch(Response.json({ error: "Title is required" }, { status: 400 }));
    await expect(
      createBook({
        title: "",
        author: "x",
        status: "done",
        rating: null,
        notes: "",
      })
    ).rejects.toMatchObject({ message: "Title is required", status: 400 });
  });

  it("explains a network failure", async () => {
    mockFetch(new TypeError("Failed to fetch"));
    await expect(deleteBook("1")).rejects.toBeInstanceOf(ApiError);
    await expect(deleteBook("1")).rejects.toThrow("Cannot reach the server");
  });

  it("returns nothing for 204", async () => {
    mockFetch(new Response(null, { status: 204 }));
    await expect(deleteBook("1")).resolves.toBeUndefined();
  });
});
