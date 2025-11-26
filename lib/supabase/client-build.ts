import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client untuk build time / static generation
 * Tidak menggunakan cookies, hanya untuk read-only operations
 */
export function createSupabaseBuildClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
