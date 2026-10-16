"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  FinanceCategory,
  FinanceCategoryInsert,
  FinanceTransaction,
  FinanceTransactionInsert,
  FinanceTransactionUpdate,
  TransactionType,
} from "@protos/types";
import { createClient } from "../supabase/client";
import { keys } from "./keys";

export interface TransactionFilters {
  type?: TransactionType;
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function useFinanceCategories() {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.finance.categories(),
    queryFn: async (): Promise<FinanceCategory[]> => {
      const { data, error } = await supabase
        .from("finance_categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

export function useTransactions(filters: TransactionFilters = {}) {
  const supabase = createClient();

  return useQuery({
    queryKey: keys.finance.transactions(filters),
    queryFn: async (): Promise<FinanceTransaction[]> => {
      let query = supabase
        .from("finance_transactions")
        .select("*")
        .order("date", { ascending: false });

      if (filters.type) query = query.eq("type", filters.type);
      if (filters.categoryId) query = query.eq("category_id", filters.categoryId);
      if (filters.dateFrom) query = query.gte("date", filters.dateFrom);
      if (filters.dateTo) query = query.lte("date", filters.dateTo);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useAddTransaction() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: FinanceTransactionInsert): Promise<FinanceTransaction> => {
      const { data: created, error } = await supabase
        .from("finance_transactions")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return created;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.finance.all() }),
  });
}

export function useUpdateTransaction() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: FinanceTransactionUpdate & { id: string }): Promise<FinanceTransaction> => {
      const { data: updated, error } = await supabase
        .from("finance_transactions")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.finance.all() }),
  });
}

export function useDeleteTransaction() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from("finance_transactions").delete().eq("id", id);
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.finance.all() }),
  });
}

export function useAddFinanceCategory() {
  const supabase = createClient();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: FinanceCategoryInsert): Promise<FinanceCategory> => {
      const { data: created, error } = await supabase
        .from("finance_categories")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return created;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: keys.finance.categories() }),
  });
}
