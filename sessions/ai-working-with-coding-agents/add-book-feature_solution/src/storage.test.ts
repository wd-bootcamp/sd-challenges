import { afterEach, describe, expect, test } from "vitest";
import { initialBooks } from "./data";
import { loadBooks, saveBooks, STORAGE_KEY } from "./storage";

afterEach(() => {
  localStorage.clear();
});

describe("storage", () => {
  test("returns the fallback when nothing is saved", () => {
    expect(loadBooks(initialBooks)).toEqual(initialBooks);
  });

  test("loads what was saved", () => {
    saveBooks([initialBooks[0]]);
    expect(loadBooks(initialBooks)).toEqual([initialBooks[0]]);
  });

  test("returns the fallback for data that is not valid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    expect(loadBooks(initialBooks)).toEqual(initialBooks);
  });

  test("returns the fallback for data of the wrong shape", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ title: "Dune" }]));
    expect(loadBooks(initialBooks)).toEqual(initialBooks);
  });
});
