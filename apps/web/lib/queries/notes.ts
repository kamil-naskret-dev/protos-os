"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Note, NoteInsert, NoteUpdate } from "@protos/types";
import { createClient } from "../supabase/client";
import { keys } from "./keys";

export interface NoteFilters {
  isPinned?: boolean;
  tag?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function useNotes(filters: NoteFilters = {}) {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.notes.list(filters),
    queryFn: async (): Promise<Note[]> => {
      let query = supabase
        .from("notes")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("date", { ascending: false });

      if (filters.isPinned !== undefined) query = query.eq("is_pinned", filters.isPinned);
      if (filters.tag) query = query.contains("tags", [filters.tag]);
      if (filters.dateFrom) query = query.gte("date", filters.dateFrom);
      if (filters.dateTo) query = query.lte("date", filters.dateTo);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useAddNote() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: NoteInsert): Promise<Note> => {
      const { data: created, error } = await supabase.from("notes").insert(data).select().single();
      if (error) throw error;
      return created;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.notes.all() }),
  });
}

export function useUpdateNote() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: NoteUpdate & { id: string }): Promise<Note> => {
      const { data: updated, error } = await supabase
        .from("notes")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.notes.all() }),
  });
}

export function useDeleteNote() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.notes.all() }),
  });
}
