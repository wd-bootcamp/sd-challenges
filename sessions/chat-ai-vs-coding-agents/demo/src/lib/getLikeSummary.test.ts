import { getLikeSummary } from "./getLikeSummary";

describe("getLikeSummary", () => {
  test("returns a hint for an empty list", () => {
    expect(getLikeSummary([])).toBe("No movies yet");
  });
});
