import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initialBooks } from "../../data";
import AddBookForm from ".";

describe("AddBookForm", () => {
  test("calls onAddBook with the trimmed values", async () => {
    const user = userEvent.setup();
    const handleAddBook = vi.fn();
    render(<AddBookForm books={initialBooks} onAddBook={handleAddBook} />);
    await user.type(screen.getByLabelText("Title"), "  Emma ");
    await user.type(screen.getByLabelText("Author"), "Jane Austen");
    await user.selectOptions(screen.getByLabelText("Rating"), "4");
    await user.click(screen.getByRole("button", { name: "Add book" }));
    expect(handleAddBook).toHaveBeenCalledWith({
      title: "Emma",
      author: "Jane Austen",
      genre: "fantasy",
      rating: 4,
    });
  });

  test("shows an error and does not call onAddBook without a title", async () => {
    const user = userEvent.setup();
    const handleAddBook = vi.fn();
    render(<AddBookForm books={initialBooks} onAddBook={handleAddBook} />);
    await user.type(screen.getByLabelText("Author"), "Jane Austen");
    await user.click(screen.getByRole("button", { name: "Add book" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Title is required.");
    expect(handleAddBook).not.toHaveBeenCalled();
  });

  test("clears the form after a book was added", async () => {
    const user = userEvent.setup();
    render(<AddBookForm books={initialBooks} onAddBook={() => {}} />);
    await user.type(screen.getByLabelText("Title"), "Emma");
    await user.type(screen.getByLabelText("Author"), "Jane Austen");
    await user.click(screen.getByRole("button", { name: "Add book" }));
    expect(screen.getByLabelText("Title")).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
