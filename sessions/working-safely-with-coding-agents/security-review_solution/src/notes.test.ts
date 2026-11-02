import { describe, expect, test } from "vitest";
import { parseNote } from "./notes";

describe("parseNote", () => {
  test("splits a note into plain and bold parts", () => {
    expect(parseNote("a **big** book")).toEqual([
      { text: "a ", bold: false },
      { text: "big", bold: true },
      { text: " book", bold: false },
    ]);
  });

  test("keeps HTML as plain text", () => {
    expect(parseNote("a <i>great</i> book")).toEqual([
      { text: "a <i>great</i> book", bold: false },
    ]);
  });

  test("returns no parts for an empty note", () => {
    expect(parseNote("")).toEqual([]);
  });
});
