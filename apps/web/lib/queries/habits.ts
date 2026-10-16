"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Habit,
  HabitCompletion,
  HabitCompletionInsert,
  HabitInsert,
  HabitUpdate,
} from "@protos/types";
import { createClient } from "../supabase/client";
import { keys } from "./keys";

export function useHabits() {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.habits.list(),
    queryFn: async (): Promise<Habit[]> => {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

export function useHabitCompletionsByDate(date: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.habits.completionsByDate(date),
    queryFn: async (): Promise<HabitCompletion[]> => {
      const { data, error } = await supabase.from("habit_completions").select("*").eq("date", date);
      if (error) throw error;
      return data;
    },
  });
}

export function useToggleHabitCompletion() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      habitId,
      date,
      userId,
      existingId,
    }: {
      habitId: string;
      date: string;
      userId: string;
      existingId?: string;
    }): Promise<{ completed: boolean }> => {
      if (existingId) {
        const { error } = await supabase.from("habit_completions").delete().eq("id", existingId);
        if (error) throw error;
        return { completed: false };
      }

      const insert: HabitCompletionInsert = { habit_id: habitId, date, user_id: userId };
      const { error } = await supabase.from("habit_completions").insert(insert);
      if (error) throw error;
      return { completed: true };
    },
    onMutate: async ({ habitId, date, existingId }) => {
      const queryKey = keys.habits.completionsByDate(date);
      await qc.cancelQueries({ queryKey });
      const previous = qc.getQueryData<HabitCompletion[]>(queryKey);

      qc.setQueryData<HabitCompletion[]>(queryKey, (old = []) => {
        if (existingId) {
          return old.filter((c) => c.id !== existingId);
        }
        // Optimistic placeholder — real id filled on settled
        return [
          ...old,
          {
            id: "optimistic",
            habit_id: habitId,
            date,
            user_id: "",
            completed_at: new Date().toISOString(),
          },
        ];
      });

      return { previous };
    },
    onError: (_err, { date }, context) => {
      if (context?.previous !== undefined) {
        qc.setQueryData(keys.habits.completionsByDate(date), context.previous);
      }
    },
    onSettled: (_data, _err, { date }) => {
      void qc.invalidateQueries({ queryKey: keys.habits.completionsByDate(date) });
    },
  });
}

export function useAddHabit() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: HabitInsert): Promise<Habit> => {
      const { data: created, error } = await supabase.from("habits").insert(data).select().single();
      if (error) throw error;
      return created;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.habits.all() }),
  });
}

export function useUpdateHabit() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: HabitUpdate & { id: string }): Promise<Habit> => {
      const { data: updated, error } = await supabase
        .from("habits")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.habits.all() }),
  });
}

export function useDeleteHabit() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from("habits").delete().eq("id", id);
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.habits.all() }),
  });
}
