// Auto-generated Supabase database types — populated after issue #60 (schema migrations)
// Run: pnpm supabase gen types typescript --local > packages/types/src/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
