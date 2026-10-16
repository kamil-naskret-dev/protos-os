"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Activity, ActivityInsert, ActivityUpdate } from "@protos/types";
import { createClient } from "../supabase/client";
import { keys } from "./keys";

export interface ActivityFilters {
  areaId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function useActivities(filters: ActivityFilters = {}) {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.activities.list(filters),
    queryFn: async (): Promise<Activity[]> => {
      let query = supabase.from("activities").select("*").order("date", { ascending: false });

      if (filters.areaId) query = query.eq("area_id", filters.areaId);
      if (filters.dateFrom) query = query.gte("date", filters.dateFrom);
      if (filters.dateTo) query = query.lte("date", filters.dateTo);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useAddActivity() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: ActivityInsert): Promise<Activity> => {
      const { data: created, error } = await supabase
        .from("activities")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return created;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.activities.all() }),
  });
}

export function useUpdateActivity() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: ActivityUpdate & { id: string }): Promise<Activity> => {
      const { data: updated, error } = await supabase
        .from("activities")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.activities.all() }),
  });
}

export function useDeleteActivity() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from("activities").delete().eq("id", id);
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.activities.all() }),
  });
}
