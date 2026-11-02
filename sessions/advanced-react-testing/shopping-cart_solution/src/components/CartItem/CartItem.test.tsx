import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from ".";

const item = { id: "2", name: "Coffee Beans", price: 12.5, quantity: 2 };

test("renders the name, the price and the quantity", () => {
  render(<CartItem item={item} />);
  expect(
    screen.getByRole("heading", { name: "Coffee Beans" })
  ).toBeInTheDocument();
  expect(screen.getByText("12.50 € each")).toBeInTheDocument();
  expect(screen.getByLabelText("Quantity")).toHaveValue(2);
});

test("calls onQuantityChange with the id and the new quantity as a number", async () => {
  const user = userEvent.setup();
  const handleQuantityChange = vi.fn();
  render(<CartItem item={item} onQuantityChange={handleQuantityChange} />);
  await user.type(screen.getByLabelText("Quantity"), "5");
  expect(handleQuantityChange).toHaveBeenLastCalledWith("2", 25);
});

test("calls onRemove with the id when the remove button is clicked", async () => {
  const user = userEvent.setup();
  const handleRemove = vi.fn();
  render(<CartItem item={item} onRemove={handleRemove} />);
  await user.click(screen.getByRole("button", { name: "Remove Coffee Beans" }));
  expect(handleRemove).toHaveBeenCalledWith("2");
});
