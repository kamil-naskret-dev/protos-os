import type { TablesInsert, TablesUpdate } from "./database";

// ─── Insert shapes (for create operations) ────────────────────────────────────

export type ProfileInsert = TablesInsert<"profiles">;
export type AreaInsert = TablesInsert<"areas">;
export type ActivityInsert = TablesInsert<"activities">;
export type PlanInsert = TablesInsert<"plans">;
export type GoalInsert = TablesInsert<"goals">;
export type HabitInsert = TablesInsert<"habits">;
export type HabitCompletionInsert = TablesInsert<"habit_completions">;
export type FinanceCategoryInsert = TablesInsert<"finance_categories">;
export type FinanceTransactionInsert = TablesInsert<"finance_transactions">;
export type NoteInsert = TablesInsert<"notes">;

// ─── Update shapes (for patch operations) ─────────────────────────────────────

export type ProfileUpdate = TablesUpdate<"profiles">;
export type AreaUpdate = TablesUpdate<"areas">;
export type ActivityUpdate = TablesUpdate<"activities">;
export type PlanUpdate = TablesUpdate<"plans">;
export type GoalUpdate = TablesUpdate<"goals">;
export type HabitUpdate = TablesUpdate<"habits">;
export type HabitCompletionUpdate = TablesUpdate<"habit_completions">;
export type FinanceCategoryUpdate = TablesUpdate<"finance_categories">;
export type FinanceTransactionUpdate = TablesUpdate<"finance_transactions">;
export type NoteUpdate = TablesUpdate<"notes">;
