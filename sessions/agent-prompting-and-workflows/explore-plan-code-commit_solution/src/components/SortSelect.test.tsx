import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortSelect from "./SortSelect";

test("shows the current sort option", () => {
  render(<SortSelect sortBy="title" onSortChange={vi.fn()} />);

  expect(screen.getByLabelText("Sort by")).toHaveValue("title");
});

test("calls onSortChange with the chosen option", async () => {
  const user = userEvent.setup();
  const handleSortChange = vi.fn();
  render(<SortSelect sortBy="added" onSortChange={handleSortChange} />);

  await user.selectOptions(screen.getByLabelText("Sort by"), "Rating (best first)");

  expect(handleSortChange).toHaveBeenCalledWith("rating");
});
