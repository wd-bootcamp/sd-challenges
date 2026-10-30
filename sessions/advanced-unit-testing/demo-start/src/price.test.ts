import { expect, test } from "vitest";
import { formatPrice } from "./price";

test("formats 1250 cents as '12,50 €'", () => {
  expect(formatPrice(1250)).toBe("12,50 €");
});
