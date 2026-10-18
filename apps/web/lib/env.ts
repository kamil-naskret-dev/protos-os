const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url) throw new Error("Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL");
if (!anonKey)
  throw new Error("Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const env = {
  NEXT_PUBLIC_SUPABASE_URL: url,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey,
} as const;
