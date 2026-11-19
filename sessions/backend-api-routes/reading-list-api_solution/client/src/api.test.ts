import { afterEach, expect, test, vi } from "vitest";

import { createBook, deleteBook, listBooks } from "./api";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

afterEach(() => {
  fetchMock.mockReset();
});

function reply(status: number, body?: unknown) {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status,
  });
}

test("listBooks sends the filters as query parameters", async () => {
  fetchMock.mockResolvedValue(reply(200, []));
  await listBooks({ status: "reading", q: "dune" });
  expect(fetchMock.mock.calls[0][0]).toBe(
    "http://localhost:3001/api/books?status=reading&q=dune"
  );
});

test("listBooks without a filter has no query string", async () => {
  fetchMock.mockResolvedValue(reply(200, []));
  await listBooks();
  expect(fetchMock.mock.calls[0][0]).toBe("http://localhost:3001/api/books");
});

test("createBook sends the book as JSON with POST", async () => {
  fetchMock.mockResolvedValue(reply(201, { id: "1", title: "Dune" }));
  await createBook({ title: "Dune", author: "Frank Herbert" });
  const [, init] = fetchMock.mock.calls[0];
  expect(init.method).toBe("POST");
  expect(init.headers).toEqual({ "Content-Type": "application/json" });
  expect(JSON.parse(init.body)).toEqual({
    title: "Dune",
    author: "Frank Herbert",
  });
});

test("deleteBook accepts a 204 without a body", async () => {
  fetchMock.mockResolvedValue(reply(204));
  await expect(deleteBook("1")).resolves.toBeUndefined();
});

test("an error response becomes an Error with the message of the API", async () => {
  fetchMock.mockResolvedValue(reply(400, { error: "title is required" }));
  await expect(createBook({ title: "", author: "A" })).rejects.toThrow(
    "title is required"
  );
});

test("a network error becomes a helpful message", async () => {
  fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
  await expect(listBooks()).rejects.toThrow("Cannot reach the API");
});
