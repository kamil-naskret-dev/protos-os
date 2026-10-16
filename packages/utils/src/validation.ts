import { z } from "zod";

// ─── Primitive helpers ─────────────────────────────────────────────────────────

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected ISO date (YYYY-MM-DD)");
const isoTime = z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Expected time (HH:MM or HH:MM:SS)");
const uuid = z.string().uuid();

// ─── Enum schemas ──────────────────────────────────────────────────────────────

export const planStatusSchema = z.enum(["planned", "done", "skipped"]);
export const goalStatusSchema = z.enum(["active", "completed", "archived"]);
export const habitFrequencySchema = z.enum(["daily", "weekly"]);
export const transactionTypeSchema = z.enum(["income", "expense"]);

// ─── Entity schemas ────────────────────────────────────────────────────────────

export const profileSchema = z.object({
  id: uuid,
  full_name: z.string().max(100).nullable(),
  avatar_url: z.string().url().nullable(),
  timezone: z.string().min(1),
  locale: z.string().min(2).max(10),
  currency: z.string().length(3),
  onboarding_completed: z.boolean(),
});

export const areaSchema = z.object({
  id: uuid,
  user_id: uuid,
  name: z.string().min(1).max(100),
  description: z.string().max(500).nullable(),
  color: z.string().min(1),
  icon: z.string().max(50).nullable(),
  sort_order: z.number().int().min(0),
});

export const activitySchema = z.object({
  id: uuid,
  user_id: uuid,
  area_id: uuid.nullable(),
  title: z.string().min(1).max(200),
  date: isoDate,
  duration_minutes: z.number().int().min(1),
  energy: z.number().int().min(1).max(5).nullable(),
  mood: z.number().int().min(1).max(5).nullable(),
  notes: z.string().max(2000).nullable(),
  tags: z.array(z.string()),
});

export const planSchema = z.object({
  id: uuid,
  user_id: uuid,
  area_id: uuid.nullable(),
  title: z.string().min(1).max(200),
  date: isoDate,
  start_time: isoTime,
  end_time: isoTime,
  status: planStatusSchema,
  notes: z.string().max(2000).nullable(),
  is_recurring: z.boolean(),
  recurrence_rule: z.string().nullable(),
  parent_plan_id: uuid.nullable(),
});

export const goalSchema = z.object({
  id: uuid,
  user_id: uuid,
  area_id: uuid.nullable(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).nullable(),
  status: goalStatusSchema,
  progress: z.number().int().min(0).max(100),
  target_date: isoDate.nullable(),
  sort_order: z.number().int().min(0),
});

export const habitSchema = z.object({
  id: uuid,
  user_id: uuid,
  area_id: uuid.nullable(),
  title: z.string().min(1).max(200),
  description: z.string().max(500).nullable(),
  frequency: habitFrequencySchema,
  target_days: z.array(z.number().int().min(0).max(6)),
  color: z.string().min(1),
  icon: z.string().max(50).nullable(),
  is_active: z.boolean(),
  sort_order: z.number().int().min(0),
});

export const habitCompletionSchema = z.object({
  id: uuid,
  habit_id: uuid,
  user_id: uuid,
  date: isoDate,
  completed_at: z.string().datetime(),
});

export const financeCategorySchema = z.object({
  id: uuid,
  user_id: uuid,
  name: z.string().min(1).max(100),
  type: transactionTypeSchema,
  color: z.string().min(1),
  icon: z.string().max(50).nullable(),
  sort_order: z.number().int().min(0),
});

export const financeTransactionSchema = z.object({
  id: uuid,
  user_id: uuid,
  category_id: uuid.nullable(),
  type: transactionTypeSchema,
  amount: z.number().positive(),
  description: z.string().min(1).max(500),
  date: isoDate,
});

export const noteSchema = z.object({
  id: uuid,
  user_id: uuid,
  title: z.string().max(200).nullable(),
  content: z.string(),
  date: isoDate,
  is_pinned: z.boolean(),
  tags: z.array(z.string()),
});

// ─── Insert schemas (omit server-managed fields) ───────────────────────────────

export const activityInsertSchema = activitySchema.omit({ id: true });
export const planInsertSchema = planSchema.omit({ id: true });
export const goalInsertSchema = goalSchema.omit({ id: true });
export const habitInsertSchema = habitSchema.omit({ id: true });
export const habitCompletionInsertSchema = habitCompletionSchema.omit({ id: true });
export const financeCategoryInsertSchema = financeCategorySchema.omit({ id: true });
export const financeTransactionInsertSchema = financeTransactionSchema.omit({ id: true });
export const noteInsertSchema = noteSchema.omit({ id: true });
