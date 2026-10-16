/**
 * Formats a duration in minutes to a human-readable string.
 * e.g. 90 → "1h 30min", 45 → "45min", 60 → "1h"
 */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

/**
 * Formats a numeric amount as a currency string using the given currency code.
 * e.g. formatCurrency(1234.5, "PLN") → "1 234,50 zł"
 */
export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a ratio (0–1) or a plain percentage value as a percentage string.
 * Values ≤ 1 are treated as ratios and multiplied by 100.
 * e.g. formatPercent(0.753) → "75%", formatPercent(75.3, 1) → "75.3%"
 */
export function formatPercent(value: number, decimals = 0): string {
  const pct = value <= 1 ? value * 100 : value;
  return `${pct.toFixed(decimals)}%`;
}

/**
 * Returns the correct Polish plural form for a count.
 * @param count  The number to pluralize for.
 * @param forms  Tuple of [one, few, many] — e.g. ["nawyk", "nawyki", "nawyków"]
 *
 * Rules:
 *  - 1          → one   (1 nawyk)
 *  - 2–4, 22–24 → few   (2 nawyki)
 *  - rest        → many  (5 nawyków)
 */
export function pluralize(count: number, forms: [string, string, string]): string {
  const [one, few, many] = forms;
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (abs === 1) return `${count} ${one}`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${count} ${few}`;
  return `${count} ${many}`;
}
