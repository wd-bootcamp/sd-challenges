import { describe, expect, it } from "vitest";

import { parseBookInput, parseBookQuery } from "./book.js";

describe("parseBookInput", () => {
  it("applies the defaults and trims title and author", () => {
    const result = parseBookInput({
      title: "  Dune ",
      author: " Frank Herbert ",
    });
    expect(result).toEqual({
      ok: true,
      value: {
        title: "Dune",
        author: "Frank Herbert",
        status: "want-to-read",
        rating: null,
        notes: "",
      },
    });
  });

  it("drops fields that are not editable", () => {
    const result = parseBookInput({
      id: "x",
      _id: "y",
      title: "A",
      author: "B",
    });
    expect(result.ok && Object.keys(result.value).sort()).toEqual([
      "author",
      "notes",
      "rating",
      "status",
      "title",
    ]);
  });

  it.each([undefined, null, "text", 5, []])("rejects the body %j", (body) => {
    expect(parseBookInput(body).ok).toBe(false);
  });

  it.each([
    [{ author: "B" }],
    [{ title: "   ", author: "B" }],
    [{ title: "A" }],
    [{ title: "A", author: "" }],
    [{ title: 1, author: "B" }],
    [{ title: "A", author: "B", status: "finished" }],
    [{ title: "A", author: "B", rating: 0 }],
    [{ title: "A", author: "B", rating: 6 }],
    [{ title: "A", author: "B", rating: 2.5 }],
    [{ title: "A", author: "B", rating: "3" }],
    [{ title: "A", author: "B", notes: 7 }],
  ])("rejects %j", (body) => {
    expect(parseBookInput(body).ok).toBe(false);
  });

  it("accepts every status and the ratings 1 to 5", () => {
    for (const status of ["want-to-read", "reading", "done"]) {
      expect(parseBookInput({ title: "A", author: "B", status }).ok).toBe(true);
    }
    for (const rating of [1, 2, 3, 4, 5, null]) {
      expect(parseBookInput({ title: "A", author: "B", rating }).ok).toBe(true);
    }
  });
});

describe("parseBookQuery", () => {
  it("accepts no filters", () => {
    expect(parseBookQuery({})).toEqual({
      ok: true,
      value: { status: undefined, q: undefined },
    });
  });

  it("trims q and ignores an empty q", () => {
    expect(parseBookQuery({ q: "  dune " })).toMatchObject({
      value: { q: "dune" },
    });
    expect(parseBookQuery({ q: "   " })).toMatchObject({
      value: { q: undefined },
    });
  });

  it("rejects an unknown status", () => {
    expect(parseBookQuery({ status: "nope" }).ok).toBe(false);
  });
});
