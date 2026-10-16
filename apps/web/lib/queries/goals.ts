"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Goal, GoalInsert, GoalStatus, GoalUpdate } from "@protos/types";
import { createClient } from "../supabase/client";
import { keys } from "./keys";

export interface GoalFilters {
  status?: GoalStatus;
  areaId?: string;
}

export function useGoals(filters: GoalFilters = {}) {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.goals.list(filters),
    queryFn: async (): Promise<Goal[]> => {
      let query = supabase.from("goals").select("*").order("sort_order");

      if (filters.status) query = query.eq("status", filters.status);
      if (filters.areaId) query = query.eq("area_id", filters.areaId);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useAddGoal() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: GoalInsert): Promise<Goal> => {
      const { data: created, error } = await supabase.from("goals").insert(data).select().single();
      if (error) throw error;
      return created;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.goals.all() }),
  });
}

export function useUpdateGoal() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: GoalUpdate & { id: string }): Promise<Goal> => {
      const { data: updated, error } = await supabase
        .from("goals")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.goals.all() }),
  });
}

export function useDeleteGoal() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from("goals").delete().eq("id", id);
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.goals.all() }),
  });
}
