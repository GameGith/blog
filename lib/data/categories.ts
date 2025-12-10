import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Category } from "@/types/blog";

export const getCategoryBySlug = cache(async (slug: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return data as Category;
});
