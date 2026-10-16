const MS_PER_DAY = 24 * 60 * 60 * 1000;
const ISO_DATE_LENGTH = 10; // "YYYY-MM-DD"

function msToWholeDays(ms: number): number {
  return Math.round(ms / MS_PER_DAY);
}

/**
 * Calculates the current streak from a list of ISO date strings.
 * The streak counts consecutive days ending on today or yesterday.
 * Duplicate dates are ignored.
 */
export function calcStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const unique = [...new Set(dates)].sort().reverse();
  const today = new Date().toISOString().slice(0, ISO_DATE_LENGTH);
  const yesterday = new Date(Date.now() - MS_PER_DAY).toISOString().slice(0, ISO_DATE_LENGTH);

  // Streak must touch today or yesterday to be considered active
  if (unique[0] !== today && unique[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1] as string);
    const curr = new Date(unique[i] as string);
    const gapDays = msToWholeDays(prev.getTime() - curr.getTime());
    if (gapDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Calculates the longest consecutive streak from a list of ISO date strings.
 * Duplicate dates are ignored.
 */
export function calcLongestStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const unique = [...new Set(dates)].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1] as string);
    const curr = new Date(unique[i] as string);
    const gapDays = msToWholeDays(curr.getTime() - prev.getTime());
    if (gapDays === 1) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }
  return longest;
}
