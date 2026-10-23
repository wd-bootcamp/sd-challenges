import { describe, expect, test } from "vitest";
import { applyDiscount, formatPrice } from "./price";

describe("formatPrice", () => {
  test.each([
    { cents: 1250, expected: "12,50 €" },
    { cents: 5, expected: "0,05 €" },
    { cents: 0, expected: "0,00 €" },
    { cents: 100000, expected: "1000,00 €" },
  ])("formats $cents cents as '$expected'", ({ cents, expected }) => {
    expect(formatPrice(cents)).toBe(expected);
  });
});

describe("applyDiscount", () => {
  test("subtracts the percentage from the price", () => {
    expect(applyDiscount(200, 25)).toBe(150);
  });

  test("returns the full price for a discount of 0 %", () => {
    expect(applyDiscount(200, 0)).toBe(200);
  });

  test("returns 0 for a discount of 100 %", () => {
    expect(applyDiscount(200, 100)).toBe(0);
  });

  test("throws a RangeError for a discount below 0", () => {
    expect(() => applyDiscount(200, -1)).toThrow(RangeError);
  });

  test("throws a RangeError for a discount above 100", () => {
    expect(() => applyDiscount(200, 101)).toThrow("between 0 and 100");
  });
});
