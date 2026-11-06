import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddBookForm } from ".";

describe("AddBookForm", () => {
  it("calls onAdd with the input and empties the form", async () => {
    const onAdd = vi.fn();
    render(<AddBookForm onAdd={onAdd} />);
    await userEvent.type(screen.getByLabelText("Title"), "Kindred");
    await userEvent.type(screen.getByLabelText("Author"), "Octavia E. Butler");
    await userEvent.type(screen.getByLabelText("Year"), "1979");
    await userEvent.click(screen.getByRole("button", { name: "Add book" }));
    expect(onAdd).toHaveBeenCalledWith({ title: "Kindred", author: "Octavia E. Butler", year: "1979" });
    expect(screen.getByLabelText("Title")).toHaveValue("");
  });

  it("shows messages and does not call onAdd for invalid input", async () => {
    const onAdd = vi.fn();
    render(<AddBookForm onAdd={onAdd} />);
    await userEvent.type(screen.getByLabelText("Year"), "3000");
    await userEvent.click(screen.getByRole("button", { name: "Add book" }));
    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getAllByRole("alert")).toHaveLength(3);
  });
});
