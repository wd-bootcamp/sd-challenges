import { readFileSync } from "node:fs";

import { describe, expect, test } from "vitest";

import { filterBooks, STATUS_LABELS } from "./books";
import type { Book, StatusFilter } from "./types";

type FilterCase = {
  name: string;
  status: StatusFilter;
  query: string;
  expectedIds: string[];
};

type Fixtures = {
  books: Book[];
  statusLabels: Record<string, string>;
  filterCases: FilterCase[];
};

const fixtures: Fixtures = JSON.parse(
  readFileSync(new URL("../../fixtures/cases.json", import.meta.url), "utf-8")
);

describe("filterBooks", () => {
  test.each(fixtures.filterCases)("$name", ({ status, query, expectedIds }) => {
    const result = filterBooks(fixtures.books, { status, query });
    expect(result.map((book) => book.id)).toEqual(expectedIds);
  });

  test("does not change the list it receives", () => {
    const copy = structuredClone(fixtures.books);
    filterBooks(fixtures.books, { status: "done", query: "the" });
    expect(fixtures.books).toEqual(copy);
  });
});

describe("STATUS_LABELS", () => {
  test("has the labels from the fixtures", () => {
    expect(STATUS_LABELS).toEqual(fixtures.statusLabels);
  });
});
