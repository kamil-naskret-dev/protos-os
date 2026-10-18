import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@protos/types/database";
import { env } from "@/lib/env";

export function createClient({ persistSession = true }: { persistSession?: boolean } = {}) {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession } },
  );
}
