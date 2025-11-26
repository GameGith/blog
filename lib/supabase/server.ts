import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await Promise.resolve(cookies());

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get?.(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set?.({ name, value, ...options });
          } catch {
            // no-op on read-only cookies
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete?.({ name, ...options });
          } catch {
            // no-op on read-only cookies
          }
        },
      },
    },
  );
}

