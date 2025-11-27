"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SearchResult = {
  id: string;
  title: string;
  slug: string;
  category: {
    name: string;
  } | null;
  tags: string[];
};

export async function searchPosts(query: string): Promise<SearchResult[]> {
  const supabase = await createSupabaseServerClient();

  // Simple ILIKE search on title, excerpt, or tags
  // Note: For production with large data, use Full Text Search (FTS)
  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      category:categories(name),
      tags
    `)
    .eq("status", "published")
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .limit(10);

  if (error) {
    console.error("Search error:", error);
    return [];
  }

  return (data || []) as unknown as SearchResult[];
}
