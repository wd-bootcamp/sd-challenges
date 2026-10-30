import { beforeEach, describe, expect, test } from "vitest";
import { addItem, getTotal, removeItem, type CartItem } from "./cart";

let apple: CartItem;
let bread: CartItem;

beforeEach(() => {
  apple = { name: "Apple", price: 2, quantity: 3 };
  bread = { name: "Bread", price: 3, quantity: 1 };
});

describe("addItem", () => {
  test("adds a new item to an empty cart", () => {
    expect(addItem([], apple)).toEqual([apple]);
  });

  test("appends a new item behind the existing ones", () => {
    expect(addItem([apple], bread)).toEqual([apple, bread]);
  });

  test("increases the quantity of an item that is already in the cart", () => {
    const cart = addItem([apple], { ...apple, quantity: 2 });

    expect(cart).toEqual([{ name: "Apple", price: 2, quantity: 5 }]);
  });

  test("does not change the cart that was passed in", () => {
    const cart = [apple];

    addItem(cart, { ...apple, quantity: 2 });

    expect(cart).toEqual([{ name: "Apple", price: 2, quantity: 3 }]);
  });
});

describe("removeItem", () => {
  test("removes the item with the given name", () => {
    expect(removeItem([apple, bread], "Apple")).toEqual([bread]);
  });

  test("leaves the cart as it is if the name is not in the cart", () => {
    expect(removeItem([apple], "Milk")).toEqual([apple]);
  });
});

describe("getTotal", () => {
  test("returns 0 for an empty cart", () => {
    expect(getTotal([])).toBe(0);
  });

  test("multiplies price and quantity and adds up all items", () => {
    // 3 * 2 + 1 * 3
    expect(getTotal([apple, bread])).toBe(9);
  });

  test.each([
    { coupon: "SAVE10", expected: 8.1 },
    { coupon: "HALF", expected: 4.5 },
  ])("applies the coupon $coupon", ({ coupon, expected }) => {
    expect(getTotal([apple, bread], coupon)).toBeCloseTo(expected);
  });

  test("throws for an unknown coupon", () => {
    expect(() => getTotal([apple], "FREE")).toThrow("Unknown coupon: FREE");
  });
});
