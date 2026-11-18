import { describe, expect, test } from "vitest";

import { BookModel } from "./Book";

// Optional challenge 2: the schema on its own. validate() needs no database.
describe("Book schema", () => {
  test("has defaults", () => {
    const book = new BookModel({ title: "Dune", author: "Frank Herbert" });
    expect(book.status).toBe("want-to-read");
    expect(book.rating).toBeNull();
    expect(book.notes).toBe("");
  });

  test.each([
    ["rating 9", { rating: 9 }, "rating"],
    ["rating 2.5", { rating: 2.5 }, "rating"],
    ["status finished", { status: "finished" }, "status"],
  ])("rejects %s", async (_name, change, field) => {
    const error = await new BookModel({
      title: "Dune",
      author: "Frank Herbert",
      ...change,
    })
      .validate()
      .catch((e) => e);
    expect(Object.keys(error.errors)).toEqual([field]);
  });
});
