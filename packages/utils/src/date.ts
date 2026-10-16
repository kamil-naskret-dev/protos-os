const MS_PER_DAY = 24 * 60 * 60 * 1000;
const ISO_DATE_LENGTH = 10; // "YYYY-MM-DD"

const SUNDAY = 0;
const MONDAY = 1;
const THURSDAY = 4;
const DAYS_FROM_MONDAY_TO_THURSDAY = THURSDAY - MONDAY; // 3

/**
 * Returns today's date as an ISO 8601 date string (YYYY-MM-DD).
 */
export function todayISO(): string {
  return new Date().toISOString().slice(0, ISO_DATE_LENGTH);
}

/**
 * Returns an ISO date string offset by `days` from today.
 * Negative values go to the past, positive to the future.
 */
export function offsetISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, ISO_DATE_LENGTH);
}

/**
 * Formats an ISO date string using Polish locale.
 * Defaults to "d MMMM yyyy" style (e.g. "3 stycznia 2026").
 */
export function formatPolish(
  iso: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
): string {
  return new Intl.DateTimeFormat("pl-PL", options).format(new Date(iso));
}

/**
 * Parses a UTC ISO string and returns a local Date object.
 */
export function toLocal(isoUtc: string): Date {
  return new Date(isoUtc);
}

/**
 * Returns the ISO date string of the Monday that starts the current week.
 *
 * getDay() returns 0 (Sun) … 6 (Sat).
 * To rebase on Monday: if Sunday, go back 6 days; otherwise go back (day - 1) days.
 */
export function currentWeekStart(): string {
  const d = new Date();
  const dayOfWeek = d.getDay();
  const daysFromMonday = dayOfWeek === SUNDAY ? 6 : dayOfWeek - MONDAY;
  d.setDate(d.getDate() - daysFromMonday);
  return d.toISOString().slice(0, ISO_DATE_LENGTH);
}

/**
 * Returns the ISO week number (1–53) for a given ISO date string.
 * Uses the ISO 8601 standard: week 1 contains the first Thursday of the year.
 *
 * Algorithm: shift the date to the nearest Thursday (ISO weeks are anchored
 * to Thursday), then count how many full weeks have elapsed since Jan 1.
 */
export function isoWeekNumber(iso: string): number {
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);

  // Convert getDay() (Sun=0…Sat=6) to ISO weekday (Mon=1…Sun=7)
  const isoWeekday = d.getDay() === SUNDAY ? 7 : d.getDay();

  // Shift to the Thursday of the same ISO week
  d.setDate(d.getDate() + DAYS_FROM_MONDAY_TO_THURSDAY + 1 - isoWeekday);

  const yearStart = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = (d.getTime() - yearStart.getTime()) / MS_PER_DAY + 1;
  return Math.ceil(dayOfYear / 7);
}
