// Run in this folder: node --test
// Node.js 22.23 or newer runs .ts files directly (it removes the types, it does not check them).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";

import { filterBooks, STATUS_LABELS, validateBook } from "./books.ts";
import type { Book, StatusFilter } from "./types.ts";

type FilterCase = {
  name: string;
  status: StatusFilter;
  query: string;
  expectedIds: string[];
};

type ValidateCase = {
  name: string;
  input: { title: string; author: string };
  expected: { title?: string; author?: string };
};

const fixtures = JSON.parse(
  readFileSync(new URL("../fixtures/cases.json", import.meta.url), "utf-8")
) as {
  books: Book[];
  statusLabels: Record<string, string>;
  filterBooks: FilterCase[];
  validateBook: ValidateCase[];
};

describe("STATUS_LABELS", () => {
  test("has the label of every status", () => {
    assert.deepEqual(STATUS_LABELS, fixtures.statusLabels);
  });
});

describe("filterBooks", () => {
  for (const c of fixtures.filterBooks) {
    test(c.name, () => {
      const result = filterBooks(fixtures.books, c.status, c.query);
      assert.deepEqual(
        result.map((book) => book.id),
        c.expectedIds
      );
    });
  }
});

describe("validateBook", () => {
  for (const c of fixtures.validateBook) {
    test(c.name, () => {
      assert.deepEqual(validateBook(c.input), c.expected);
    });
  }
});
