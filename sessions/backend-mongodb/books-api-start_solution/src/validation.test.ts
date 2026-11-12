import { describe, expect, test } from "vitest";

import { parseBookInput } from "./validation";

describe("parseBookInput", () => {
  test("applies the defaults", () => {
    expect(parseBookInput({ title: "Dune", author: "Frank Herbert" })).toEqual({
      value: {
        title: "Dune",
        author: "Frank Herbert",
        status: "want-to-read",
        rating: null,
        notes: "",
      },
    });
  });

  test("trims title and author and ignores unknown fields", () => {
    const result = parseBookInput({
      title: " Dune ",
      author: " FH ",
      id: "x",
      extra: 1,
    });
    expect(result).toEqual({
      value: expect.objectContaining({ title: "Dune", author: "FH" }),
    });
    expect(result).not.toHaveProperty("value.id");
  });

  test.each([undefined, null, "text", 5, []])("rejects the body %j", (body) => {
    expect(parseBookInput(body)).toHaveProperty("error");
  });

  test.each([
    [{ author: "A" }],
    [{ title: "", author: "A" }],
    [{ title: "   ", author: "A" }],
    [{ title: 7, author: "A" }],
    [{ title: "T" }],
    [{ title: "T", author: " " }],
  ])("rejects a missing or empty title or author: %j", (body) => {
    expect(parseBookInput(body)).toHaveProperty("error");
  });

  test.each(["finished", "", 1, null])("rejects the status %j", (status) => {
    expect(parseBookInput({ title: "T", author: "A", status })).toHaveProperty(
      "error"
    );
  });

  test.each([0, 6, 3.5, "4", -1, NaN, true])(
    "rejects the rating %j",
    (rating) => {
      expect(
        parseBookInput({ title: "T", author: "A", rating })
      ).toHaveProperty("error");
    }
  );

  test.each([null, 1, 5])("accepts the rating %j", (rating) => {
    expect(parseBookInput({ title: "T", author: "A", rating })).toHaveProperty(
      "value.rating",
      rating
    );
  });

  test("rejects notes that are not a string", () => {
    expect(
      parseBookInput({ title: "T", author: "A", notes: 5 })
    ).toHaveProperty("error");
  });
});
