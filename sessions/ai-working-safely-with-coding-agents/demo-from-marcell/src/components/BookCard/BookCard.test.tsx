import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookCard } from ".";
import type { Book } from "../../books";

const book: Book = {
  id: "1",
  title: "Dune",
  author: "Frank Herbert",
  year: 1965,
  rating: 5,
  read: false,
};

describe("BookCard", () => {
  it("shows the title, the author and the year", () => {
    render(<BookCard book={book} onToggleRead={() => {}} />);
    expect(screen.getByRole("heading", { name: "Dune" })).toBeInTheDocument();
    expect(screen.getByText("Frank Herbert · 1965")).toBeInTheDocument();
  });

  it("calls onToggleRead with the id of the book", async () => {
    const onToggleRead = vi.fn();
    render(<BookCard book={book} onToggleRead={onToggleRead} />);
    await userEvent.click(screen.getByRole("button", { name: "Mark as read" }));
    expect(onToggleRead).toHaveBeenCalledWith("1");
  });
});
