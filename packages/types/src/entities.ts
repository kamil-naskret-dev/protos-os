import type { Enums, Tables } from "./database";

// ─── Entity types (Row shapes from DB) ───────────────────────────────────────

export type Profile = Tables<"profiles">;
export type Area = Tables<"areas">;
export type Activity = Tables<"activities">;
export type Plan = Tables<"plans">;
export type Goal = Tables<"goals">;
export type Habit = Tables<"habits">;
export type HabitCompletion = Tables<"habit_completions">;
export type FinanceCategory = Tables<"finance_categories">;
export type FinanceTransaction = Tables<"finance_transactions">;
export type Note = Tables<"notes">;

// ─── Enum types ───────────────────────────────────────────────────────────────

export type PlanStatus = Enums<"plan_status">;
export type GoalStatus = Enums<"goal_status">;
export type HabitFrequency = Enums<"habit_frequency">;
export type TransactionType = Enums<"transaction_type">;
