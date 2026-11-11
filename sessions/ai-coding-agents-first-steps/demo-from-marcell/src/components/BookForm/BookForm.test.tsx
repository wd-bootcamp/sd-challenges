import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookForm } from ".";

describe("BookForm", () => {
  it("adds an unread, unrated book and empties the form", async () => {
    const onAdd = vi.fn();
    render(<BookForm onAdd={onAdd} />);

    await userEvent.type(screen.getByLabelText("Title"), "Emma");
    await userEvent.type(screen.getByLabelText("Author"), "Jane Austen");
    await userEvent.type(screen.getByLabelText("Year"), "1815");
    await userEvent.click(screen.getByRole("button", { name: "Add book" }));

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Emma",
        author: "Jane Austen",
        year: 1815,
        rating: null,
        read: false,
      }),
    );
    expect(screen.getByLabelText("Title")).toHaveValue("");
    expect(screen.getByLabelText("Author")).toHaveValue("");
    expect(screen.getByLabelText("Year")).toHaveValue(null);
  });

  it("shows messages next to the fields and adds nothing for invalid input", async () => {
    const onAdd = vi.fn();
    render(<BookForm onAdd={onAdd} />);

    await userEvent.type(screen.getByLabelText("Year"), "1200");
    await userEvent.click(screen.getByRole("button", { name: "Add book" }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByText("Title is required.")).toBeInTheDocument();
    expect(screen.getByText("Author is required.")).toBeInTheDocument();
    expect(screen.getByText(/Year must be a number between 1450/)).toBeInTheDocument();
  });
});
