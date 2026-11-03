import { afterEach, describe, expect, test, vi } from "vitest";
import { calculatePoints, generateRedeemCode, loyaltyHeaders } from "./loyalty";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("calculatePoints", () => {
  test.each([
    ["regular", 49.9, 49],
    ["member", 49.9, 99],
    ["vip", 49.9, 149],
  ] as const)("gives %s customers the right points", (type, total, points) => {
    expect(calculatePoints(total, type)).toBe(points);
  });
});

describe("generateRedeemCode", () => {
  test("generates an upper case code with 8 characters", () => {
    expect(generateRedeemCode()).toMatch(/^[0-9A-F]{8}$/);
  });
});

describe("loyaltyHeaders", () => {
  test("reads the key from the environment", () => {
    vi.stubEnv("LOYALTY_PASSWORD", "secret");
    expect(loyaltyHeaders()).toEqual({
      Authorization: `Basic ${Buffer.from("loyalty:secret").toString("base64")}`,
    });
  });
});
