import { filterUnread, rateBook, type Book } from "./books";

const shelf: Book[] = [
  { id: "1", title: "Dune", author: "Frank Herbert", year: 1965, rating: 5, read: true },
  { id: "2", title: "Neuromancer", author: "William Gibson", year: 1984, rating: null, read: false },
];

describe("filterUnread", () => {
  it("returns only the unread books", () => {
    expect(filterUnread(shelf).map((book) => book.id)).toEqual(["2"]);
  });

  it("does not change the input", () => {
    filterUnread(shelf);
    expect(shelf).toHaveLength(2);
  });
});

describe("rateBook", () => {
  it("sets the rating of one book", () => {
    expect(rateBook(shelf, "2", 3)[1].rating).toBe(3);
  });

  it("removes the rating when the same rating is given again", () => {
    expect(rateBook(shelf, "1", 5)[0].rating).toBeNull();
  });

  it("does not change the input", () => {
    rateBook(shelf, "2", 4);
    expect(shelf[1].rating).toBeNull();
  });

  it.each([0, 6, 2.5])("throws for the rating %s", (rating) => {
    expect(() => rateBook(shelf, "1", rating)).toThrow();
  });
});
