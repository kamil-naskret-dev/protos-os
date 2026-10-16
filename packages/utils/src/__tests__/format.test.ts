import { describe, expect, it } from "vitest";
import { formatDuration, formatCurrency, formatPercent, pluralize } from "../format";

describe("formatDuration", () => {
  it("formats minutes only", () => {
    expect(formatDuration(45)).toBe("45min");
  });

  it("formats hours only", () => {
    expect(formatDuration(60)).toBe("1h");
    expect(formatDuration(120)).toBe("2h");
  });

  it("formats hours and minutes", () => {
    expect(formatDuration(90)).toBe("1h 30min");
    expect(formatDuration(125)).toBe("2h 5min");
  });
});

describe("formatCurrency", () => {
  it("formats PLN correctly", () => {
    const result = formatCurrency(1234.5, "PLN");
    expect(result).toContain("1");
    expect(result).toContain("234");
    expect(result).toContain("50");
  });

  it("formats zero correctly", () => {
    const result = formatCurrency(0, "PLN");
    expect(result).toContain("0");
  });

  it("formats negative amount", () => {
    const result = formatCurrency(-50, "PLN");
    expect(result).toContain("50");
  });
});

describe("formatPercent", () => {
  it("treats values <= 1 as ratios", () => {
    expect(formatPercent(0.75)).toBe("75%");
    expect(formatPercent(1)).toBe("100%");
    expect(formatPercent(0)).toBe("0%");
  });

  it("treats values > 1 as percentage", () => {
    expect(formatPercent(75)).toBe("75%");
    expect(formatPercent(100)).toBe("100%");
  });

  it("respects decimal places", () => {
    expect(formatPercent(0.753, 1)).toBe("75.3%");
    expect(formatPercent(0.753, 2)).toBe("75.30%");
  });
});

describe("pluralize", () => {
  const forms: [string, string, string] = ["nawyk", "nawyki", "nawyków"];

  it("uses singular for 1", () => {
    expect(pluralize(1, forms)).toBe("1 nawyk");
  });

  it("uses few for 2–4", () => {
    expect(pluralize(2, forms)).toBe("2 nawyki");
    expect(pluralize(3, forms)).toBe("3 nawyki");
    expect(pluralize(4, forms)).toBe("4 nawyki");
  });

  it("uses many for 5+", () => {
    expect(pluralize(5, forms)).toBe("5 nawyków");
    expect(pluralize(11, forms)).toBe("11 nawyków");
    expect(pluralize(21, forms)).toBe("21 nawyków");
  });

  it("uses few for 22–24", () => {
    expect(pluralize(22, forms)).toBe("22 nawyki");
    expect(pluralize(23, forms)).toBe("23 nawyki");
    expect(pluralize(24, forms)).toBe("24 nawyki");
  });

  it("uses many for 12–14 (teens rule)", () => {
    expect(pluralize(12, forms)).toBe("12 nawyków");
    expect(pluralize(13, forms)).toBe("13 nawyków");
    expect(pluralize(14, forms)).toBe("14 nawyków");
  });

  it("handles 0", () => {
    expect(pluralize(0, forms)).toBe("0 nawyków");
  });
});
