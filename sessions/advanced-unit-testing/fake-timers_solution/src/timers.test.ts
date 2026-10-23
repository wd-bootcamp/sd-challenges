import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { debounce, getGreeting, startCountdown } from "./timers";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getGreeting", () => {
  test("greets with 'Good morning' at 9:00", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 9, 0));

    expect(getGreeting()).toBe("Good morning");
  });

  test.each([
    { hour: 11, minute: 59, expected: "Good morning" },
    { hour: 12, minute: 0, expected: "Good afternoon" },
    { hour: 17, minute: 59, expected: "Good afternoon" },
    { hour: 18, minute: 0, expected: "Good evening" },
    { hour: 23, minute: 30, expected: "Good evening" },
  ])(
    "greets with '$expected' at $hour:$minute",
    ({ hour, minute, expected }) => {
      vi.setSystemTime(new Date(2026, 0, 1, hour, minute));

      expect(getGreeting()).toBe(expected);
    },
  );
});

describe("debounce", () => {
  test("does not call the callback immediately", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);

    debounced();

    expect(callback).not.toHaveBeenCalled();
  });

  test("calls the callback once after the delay", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);

    debounced();
    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("calls the callback only once for several quick calls", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);

    debounced();
    debounced();
    debounced();
    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("restarts the delay with every call", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);

    debounced();
    vi.advanceTimersByTime(400);
    debounced();
    vi.advanceTimersByTime(400);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe("startCountdown", () => {
  test("calls onTick every second with the remaining seconds", () => {
    const onTick = vi.fn();
    startCountdown(3, onTick, vi.fn());

    vi.advanceTimersByTime(3000);

    expect(onTick.mock.calls).toEqual([[2], [1], [0]]);
  });

  test("does not call onDone before the countdown is over", () => {
    const onDone = vi.fn();
    startCountdown(3, vi.fn(), onDone);

    vi.advanceTimersByTime(2999);

    expect(onDone).not.toHaveBeenCalled();
  });

  test("calls onDone when the countdown reaches 0", () => {
    const onDone = vi.fn();
    startCountdown(3, vi.fn(), onDone);

    vi.advanceTimersByTime(3000);

    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test("stops ticking after the returned cancel function was called", () => {
    const onTick = vi.fn();
    const onDone = vi.fn();
    const cancel = startCountdown(3, onTick, onDone);

    vi.advanceTimersByTime(1000);
    cancel();
    vi.advanceTimersByTime(5000);

    expect(onTick).toHaveBeenCalledTimes(1);
    expect(onDone).not.toHaveBeenCalled();
  });

  test("calls onDone right away for a countdown of 0 seconds", () => {
    const onTick = vi.fn();
    const onDone = vi.fn();

    startCountdown(0, onTick, onDone);

    expect(onDone).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(5000);

    expect(onTick).not.toHaveBeenCalled();
  });
});
