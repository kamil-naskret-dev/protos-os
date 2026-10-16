import { describe, expect, it, vi, afterEach } from "vitest";
import { calcStreak, calcLongestStreak } from "../streak";

const TODAY = "2026-01-08";
const FIXED = new Date("2026-01-08T12:00:00.000Z");

afterEach(() => {
  vi.useRealTimers();
});

describe("calcStreak", () => {
  it("returns 0 for empty array", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED);
    expect(calcStreak([])).toBe(0);
  });

  it("returns 1 for only today", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED);
    expect(calcStreak([TODAY])).toBe(1);
  });

  it("returns 1 for only yesterday", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED);
    expect(calcStreak(["2026-01-07"])).toBe(1);
  });

  it("returns 0 if most recent date is older than yesterday", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED);
    expect(calcStreak(["2026-01-06"])).toBe(0);
  });

  it("counts consecutive days correctly", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED);
    expect(calcStreak([TODAY, "2026-01-07", "2026-01-06", "2026-01-05"])).toBe(4);
  });

  it("stops at a gap", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED);
    expect(calcStreak([TODAY, "2026-01-07", "2026-01-05"])).toBe(2);
  });

  it("ignores duplicate dates", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED);
    expect(calcStreak([TODAY, TODAY, "2026-01-07"])).toBe(2);
  });
});

describe("calcLongestStreak", () => {
  it("returns 0 for empty array", () => {
    expect(calcLongestStreak([])).toBe(0);
  });

  it("returns 1 for single date", () => {
    expect(calcLongestStreak(["2026-01-01"])).toBe(1);
  });

  it("calculates longest streak across gaps", () => {
    expect(
      calcLongestStreak([
        "2026-01-01",
        "2026-01-02",
        "2026-01-03",
        "2026-01-05",
        "2026-01-06",
        "2026-01-07",
        "2026-01-08",
      ]),
    ).toBe(4);
  });

  it("handles all consecutive dates", () => {
    expect(calcLongestStreak(["2026-01-01", "2026-01-02", "2026-01-03"])).toBe(3);
  });

  it("ignores duplicate dates", () => {
    expect(calcLongestStreak(["2026-01-01", "2026-01-01", "2026-01-02"])).toBe(2);
  });
});
