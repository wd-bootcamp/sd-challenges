import { expect, test } from "vitest";
import { isValidCoupon } from "./coupon";

test("accepts SAVE10", () => {
  expect(isValidCoupon("SAVE10")).toBe(true);
});
