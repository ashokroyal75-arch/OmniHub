import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// During local prototyping without Supabase credentials configured,
// this client is created but calls will no-op via the guards in lib/mockData.ts.
export const supabase = createClient(url || "https://placeholder.supabase.co", anonKey || "placeholder");

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
