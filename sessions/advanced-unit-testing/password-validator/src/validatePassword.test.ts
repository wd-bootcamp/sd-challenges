import { describe, expect, test } from "vitest";
import { assertValidPassword, validatePassword } from "./validatePassword";

describe("validatePassword", () => {
  test("returns an empty array for a valid password", () => {
    // TODO: use the password "Secret123"
  });

  test("reports a password that is too short", () => {
    const errors = validatePassword("Ab1");

    expect(errors).toContain("Password must have at least 8 characters");
  });

  test("accepts a password with exactly 8 characters", () => {
    // TODO: boundary case, use the password "Abcdef12"
  });

  test("reports a password without a digit", () => {
    // TODO
  });

  test("reports a password without an uppercase letter", () => {
    // TODO
  });

  test("reports a password with a space", () => {
    // TODO
  });

  test("returns all errors at once for a password that breaks every rule", () => {
    // TODO: use the password "a b"
  });
});

describe("assertValidPassword", () => {
  test("does not throw for a valid password", () => {
    // TODO
  });

  test("throws an error that lists the broken rules", () => {
    // TODO
  });
});
