import { estimateReadingTime } from "./estimateReadingTime";

describe("estimateReadingTime", () => {
  test("returns 'less than 5 min' when the time rounds to 0", () => {
    expect(estimateReadingTime(1)).toBe("less than 5 min");
  });

  test("rounds halves up to the next 5 minutes", () => {
    expect(estimateReadingTime(5)).toBe("about 10 min");
  });

  test("returns minutes only under one hour", () => {
    expect(estimateReadingTime(30)).toBe("about 45 min");
  });

  test("returns full hours without minutes", () => {
    expect(estimateReadingTime(39)).toBe("about 1 h");
  });

  test("returns hours and minutes", () => {
    expect(estimateReadingTime(100)).toBe("about 2 h 30 min");
    expect(estimateReadingTime(310)).toBe("about 7 h 45 min");
  });

  test("uses a custom reading speed", () => {
    expect(estimateReadingTime(100, 60)).toBe("about 1 h 40 min");
  });

  test.each([0, -5, 2.5, NaN])("throws for %s pages", (pages) => {
    expect(() => estimateReadingTime(pages)).toThrow(
      "pages must be a positive whole number"
    );
  });

  test.each([0, -10, NaN])("throws for a reading speed of %s", (pagesPerHour) => {
    expect(() => estimateReadingTime(100, pagesPerHour)).toThrow(
      "pagesPerHour must be greater than 0"
    );
  });

  // Edge case added by the student: very large books still use hours, not days.
  test("handles very large books", () => {
    expect(estimateReadingTime(1200)).toBe("about 30 h");
  });
});
