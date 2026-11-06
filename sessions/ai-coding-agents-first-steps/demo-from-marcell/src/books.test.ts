import {
  averageRating,
  countRead,
  createBook,
  searchBooks,
  sortByYear,
  toggleRead,
  validateBook,
  type Book,
} from "./books";

const books: Book[] = [
  { id: "1", title: "Dune", author: "Frank Herbert", year: 1965, rating: 5, read: true },
  { id: "2", title: "The Hobbit", author: "J. R. R. Tolkien", year: 1937, rating: 3, read: false },
];

describe("searchBooks", () => {
  it("finds a book by its title", () => {
    expect(searchBooks(books, "Dune")).toEqual([books[0]]);
  });

  it("returns all books for an empty query", () => {
    expect(searchBooks(books, "  ")).toEqual(books);
  });
});

describe("averageRating", () => {
  it("returns the average rating", () => {
    expect(averageRating(books)).toBe(4);
  });

  it("returns null for an empty list", () => {
    expect(averageRating([])).toBeNull();
  });
});

describe("sortByYear", () => {
  it("sorts the books by year, oldest first", () => {
    expect(sortByYear([...books]).map((book) => book.title)).toEqual(["The Hobbit", "Dune"]);
  });
});

describe("countRead", () => {
  it("counts the books that are read", () => {
    expect(countRead(books)).toBe(1);
  });
});

describe("toggleRead", () => {
  it("toggles the read state of one book and does not change the input", () => {
    const result = toggleRead(books, "2");
    expect(result[1].read).toBe(true);
    expect(books[1].read).toBe(false);
  });
});

describe("validateBook", () => {
  const now = new Date("2026-06-01");
  const valid = { title: "Dune", author: "Frank Herbert", year: "1965" };

  it("accepts valid input", () => {
    expect(validateBook(valid, now)).toEqual({});
  });

  it("requires title and author", () => {
    const errors = validateBook({ ...valid, title: "  ", author: "" }, now);
    expect(errors.title).toBeDefined();
    expect(errors.author).toBeDefined();
    expect(errors.year).toBeUndefined();
  });

  it("accepts the years 1450 and the current year", () => {
    expect(validateBook({ ...valid, year: "1450" }, now)).toEqual({});
    expect(validateBook({ ...valid, year: "2026" }, now)).toEqual({});
  });

  it.each(["1449", "2027", "", "abc", "1965.5"])("rejects the year %j", (year) => {
    expect(validateBook({ ...valid, year }, now).year).toBeDefined();
  });
});

describe("createBook", () => {
  it("creates an unread, unrated book with trimmed text", () => {
    expect(createBook({ title: " Dune ", author: " Frank Herbert ", year: "1965" }, "x")).toEqual({
      id: "x",
      title: "Dune",
      author: "Frank Herbert",
      year: 1965,
      rating: null,
      read: false,
    });
  });
});
