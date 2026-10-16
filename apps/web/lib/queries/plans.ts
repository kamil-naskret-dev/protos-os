"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Plan, PlanInsert, PlanStatus, PlanUpdate } from "@protos/types";
import { createClient } from "../supabase/client";
import { keys } from "./keys";

export function usePlansByDate(date: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.plans.byDate(date),
    queryFn: async (): Promise<Plan[]> => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("date", date)
        .order("start_time");
      if (error) throw error;
      return data;
    },
  });
}

export function usePlansByWeek(weekStart: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.plans.byWeek(weekStart),
    queryFn: async (): Promise<Plan[]> => {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const weekEndISO = weekEnd.toISOString().slice(0, 10);

      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .gte("date", weekStart)
        .lte("date", weekEndISO)
        .order("date")
        .order("start_time");
      if (error) throw error;
      return data;
    },
  });
}

export function useAddPlan() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: PlanInsert): Promise<Plan> => {
      const { data: created, error } = await supabase.from("plans").insert(data).select().single();
      if (error) throw error;
      return created;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.plans.all() }),
  });
}

export function useUpdatePlan() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: PlanUpdate & { id: string }): Promise<Plan> => {
      const { data: updated, error } = await supabase
        .from("plans")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.plans.all() }),
  });
}

export function useTogglePlanStatus() {
  const supabase = createClient();
  const qc = useQueryClient();

  const STATUS_CYCLE: Record<PlanStatus, PlanStatus> = {
    planned: "done",
    done: "skipped",
    skipped: "planned",
  };

  return useMutation({
    mutationFn: async ({
      id,
      currentStatus,
    }: {
      id: string;
      currentStatus: PlanStatus;
    }): Promise<Plan> => {
      const nextStatus = STATUS_CYCLE[currentStatus];
      const { data, error } = await supabase
        .from("plans")
        .update({ status: nextStatus })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onMutate: async ({ id, currentStatus }) => {
      await qc.cancelQueries({ queryKey: keys.plans.all() });
      const nextStatus = STATUS_CYCLE[currentStatus];

      // Optimistic update across all cached plan queries
      qc.setQueriesData<Plan[]>({ queryKey: keys.plans.all() }, (old) =>
        old?.map((p) => (p.id === id ? { ...p, status: nextStatus } : p)),
      );

      return { previousStatus: currentStatus };
    },
    onError: (_err, { id, currentStatus }) => {
      qc.setQueriesData<Plan[]>({ queryKey: keys.plans.all() }, (old) =>
        old?.map((p) => (p.id === id ? { ...p, status: currentStatus } : p)),
      );
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.plans.all() }),
  });
}

export function useDeletePlan() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from("plans").delete().eq("id", id);
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.plans.all() }),
  });
}
