import { beforeEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem, { type CartItemProps } from "../CartItem";
import ShippingEstimate from "../ShippingEstimate";
import Cart from ".";

// Both children are replaced: CartItem by a simple stand-in that lets us trigger
// the handlers, ShippingEstimate by a component that does not use fetch.
vi.mock("../CartItem", () => ({
  default: vi.fn(({ item, onQuantityChange, onRemove }: CartItemProps) => (
    <li>
      {item.name}
      <button type="button" onClick={() => onQuantityChange?.(item.id, 3)}>
        set quantity of {item.name} to 3
      </button>
      <button type="button" onClick={() => onRemove?.(item.id)}>
        remove {item.name}
      </button>
    </li>
  )),
}));
vi.mock("../ShippingEstimate", () => ({
  default: vi.fn(() => <p>shipping estimate</p>),
}));

const initialItems = [
  { id: "1", name: "Coffee Grinder", price: 80, quantity: 1 },
  { id: "2", name: "Coffee Beans", price: 12.5, quantity: 2 },
];

beforeEach(() => {
  vi.mocked(CartItem).mockClear();
  vi.mocked(ShippingEstimate).mockClear();
});

test("renders a CartItem for every item", () => {
  render(<Cart initialItems={initialItems} />);
  expect(screen.getByText("Coffee Grinder")).toBeInTheDocument();
  expect(screen.getByText("Coffee Beans")).toBeInTheDocument();
});

test("passes the item to its CartItem", () => {
  render(<Cart initialItems={initialItems} />);
  const props = vi.mocked(CartItem).mock.calls.map(([props]) => props);
  expect(props[1].item).toEqual(initialItems[1]);
});

test("shows the total price of all items", () => {
  render(<Cart initialItems={initialItems} />);
  expect(screen.getByText("Total: 105.00 €")).toBeInTheDocument();
});

test("passes the total to ShippingEstimate", () => {
  render(<Cart initialItems={initialItems} />);
  const props = vi.mocked(ShippingEstimate).mock.lastCall?.[0];
  expect(props).toEqual({ total: 105 });
});

test("updates the total when a quantity changes", async () => {
  const user = userEvent.setup();
  render(<Cart initialItems={initialItems} />);
  await user.click(
    screen.getByRole("button", { name: "set quantity of Coffee Beans to 3" })
  );
  expect(screen.getByText("Total: 117.50 €")).toBeInTheDocument();
});

test("removes an item when its CartItem calls onRemove", async () => {
  const user = userEvent.setup();
  render(<Cart initialItems={initialItems} />);
  await user.click(
    screen.getByRole("button", { name: "remove Coffee Grinder" })
  );
  expect(screen.queryByText("Coffee Grinder")).not.toBeInTheDocument();
  expect(screen.getByText("Total: 25.00 €")).toBeInTheDocument();
});

test("shows a message and no ShippingEstimate when the cart is empty", () => {
  render(<Cart initialItems={[]} />);
  expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  expect(ShippingEstimate).not.toHaveBeenCalled();
});
