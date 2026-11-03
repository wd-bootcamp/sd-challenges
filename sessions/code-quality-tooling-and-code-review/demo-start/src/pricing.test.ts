import { describe, expect, test } from "vitest";
import { calc } from "./pricing";

const items = [{ name: "Book", price: 20, quantity: 2 }];

describe("calc", () => {
  test("adds shipping for small orders", () => {
    expect(calc(items, "regular")).toBeCloseTo(44.99);
  });

  test("gives vip customers 15 % off", () => {
    expect(calc([{ name: "Lamp", price: 100, quantity: 1 }], "vip")).toBe(85);
  });
});
