import { describe, expect, test } from "vitest";
import { assertValidPassword, validatePassword } from "./validatePassword";

describe("validatePassword", () => {
  test("returns an empty array for a valid password", () => {
    expect(validatePassword("Secret123")).toEqual([]);
  });

  test("reports a password that is too short", () => {
    const errors = validatePassword("Ab1");

    expect(errors).toContain("Password must have at least 8 characters");
  });

  test("accepts a password with exactly 8 characters", () => {
    expect(validatePassword("Abcdef12")).toEqual([]);
  });

  test.each([
    {
      rule: "a digit",
      password: "Secretpass",
      message: "Password must contain a digit",
    },
    {
      rule: "an uppercase letter",
      password: "secret123",
      message: "Password must contain an uppercase letter",
    },
    {
      rule: "no spaces",
      password: "Secret 123",
      message: "Password must not contain spaces",
    },
  ])("reports a password that breaks the rule: $rule", ({ password, message }) => {
    expect(validatePassword(password)).toEqual([message]);
  });

  test("returns all errors at once for a password that breaks every rule", () => {
    expect(validatePassword("a b")).toHaveLength(4);
  });
});

describe("assertValidPassword", () => {
  test("does not throw for a valid password", () => {
    expect(() => assertValidPassword("Secret123")).not.toThrow();
  });

  test("throws an error that lists the broken rules", () => {
    expect(() => assertValidPassword("abc")).toThrow(
      "Password must have at least 8 characters, Password must contain a digit, Password must contain an uppercase letter",
    );
  });
});
