import { describe, expect, it, vi, afterEach } from "vitest";
import {
  todayISO,
  offsetISO,
  formatPolish,
  toLocal,
  currentWeekStart,
  isoWeekNumber,
} from "../date";

const FIXED_DATE = new Date("2026-01-08T12:00:00.000Z"); // Thursday, week 2

afterEach(() => {
  vi.useRealTimers();
});

describe("todayISO", () => {
  it("returns today as YYYY-MM-DD", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
    expect(todayISO()).toBe("2026-01-08");
  });
});

describe("offsetISO", () => {
  it("returns a future date for positive offset", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
    expect(offsetISO(3)).toBe("2026-01-11");
  });

  it("returns a past date for negative offset", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
    expect(offsetISO(-2)).toBe("2026-01-06");
  });

  it("returns today for offset 0", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
    expect(offsetISO(0)).toBe("2026-01-08");
  });
});

describe("formatPolish", () => {
  it("formats date in Polish locale by default", () => {
    const result = formatPolish("2026-01-08");
    expect(result).toContain("2026");
    expect(result).toContain("stycznia");
  });

  it("accepts custom options", () => {
    const result = formatPolish("2026-01-08", { month: "long" });
    expect(result).toBe("styczeń");
  });
});

describe("toLocal", () => {
  it("returns a Date object", () => {
    const d = toLocal("2026-01-08T12:00:00.000Z");
    expect(d).toBeInstanceOf(Date);
  });

  it("preserves the timestamp", () => {
    const iso = "2026-01-08T12:00:00.000Z";
    expect(toLocal(iso).toISOString()).toBe(iso);
  });
});

describe("currentWeekStart", () => {
  it("returns the Monday of the current week", () => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE); // Thursday 2026-01-08
    expect(currentWeekStart()).toBe("2026-01-05"); // Monday
  });

  it("returns same day when today is Monday", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-05T12:00:00.000Z")); // Monday
    expect(currentWeekStart()).toBe("2026-01-05");
  });

  it("handles Sunday correctly", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-11T12:00:00.000Z")); // Sunday
    expect(currentWeekStart()).toBe("2026-01-05");
  });
});

describe("isoWeekNumber", () => {
  it("returns correct week number for Jan 8", () => {
    expect(isoWeekNumber("2026-01-08")).toBe(2);
  });

  it("returns week 1 for Jan 1 2026 (Thursday)", () => {
    expect(isoWeekNumber("2026-01-01")).toBe(1);
  });

  it("returns week 53 for Dec 28 2026", () => {
    // 2026-12-28 is a Monday in week 53
    expect(isoWeekNumber("2026-12-28")).toBe(53);
  });
});
