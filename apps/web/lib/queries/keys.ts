/**
 * Centralised query key factory.
 * Using arrays allows React Query to invalidate by prefix:
 *   qc.invalidateQueries({ queryKey: keys.activities.all() })
 *   invalidates every key that starts with ["activities"].
 */
export const keys = {
  activities: {
    all: () => ["activities"] as const,
    list: (filters?: unknown) => ["activities", "list", filters] as const,
    detail: (id: string) => ["activities", "detail", id] as const,
  },
  plans: {
    all: () => ["plans"] as const,
    byDate: (date: string) => ["plans", "date", date] as const,
    byWeek: (weekStart: string) => ["plans", "week", weekStart] as const,
  },
  goals: {
    all: () => ["goals"] as const,
    list: (filters?: unknown) => ["goals", "list", filters] as const,
  },
  habits: {
    all: () => ["habits"] as const,
    list: () => ["habits", "list"] as const,
    completions: (habitId: string, month: string) =>
      ["habits", "completions", habitId, month] as const,
    completionsByDate: (date: string) => ["habits", "completions", "date", date] as const,
  },
  finance: {
    all: () => ["finance"] as const,
    categories: () => ["finance", "categories"] as const,
    transactions: (filters?: unknown) => ["finance", "transactions", filters] as const,
  },
  notes: {
    all: () => ["notes"] as const,
    list: (filters?: unknown) => ["notes", "list", filters] as const,
  },
} as const;
