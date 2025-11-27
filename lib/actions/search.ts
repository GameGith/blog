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

export type CategoryResult = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type TagResult = {
  tag: string;
  count: number;
};

export async function searchPosts(query: string): Promise<SearchResult[]> {
  const supabase = await createSupabaseServerClient();
  const lowerQuery = query.toLowerCase();

  // 1. DB Search: Find IDs of posts where title, excerpt, or content matches
  // This avoids fetching full content to the server
  const { data: textMatchIds, error: textError } = await supabase
    .from("posts")
    .select("id")
    .eq("status", "published")
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`);

  if (textError) {
    console.error("Search text error:", textError);
    return [];
  }

  const textMatchIdSet = new Set(textMatchIds?.map(p => p.id));

  // 2. Fetch metadata for ALL published posts to handle Tag partial search in JS
  // (Supabase doesn't support partial array element matching easily)
  const { data: allPosts, error: allError } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      category:categories(name),
      tags
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (allError) {
    console.error("Search metadata error:", allError);
    return [];
  }

  // 3. Filter: Include if Text Match OR Tag Match
  const results = allPosts.filter(post => {
    // Check if matched by DB text search
    if (textMatchIdSet.has(post.id)) return true;

    // Check if any tag partially matches the query
    if (post.tags && Array.isArray(post.tags)) {
      return post.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    }

    return false;
  });

  return results.slice(0, 10) as unknown as SearchResult[];
}

export async function searchCategories(query: string): Promise<CategoryResult[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .ilike("name", `%${query}%`)
    .limit(5);

  if (error) {
    console.error("Search categories error:", error);
    return [];
  }

  return (data || []) as CategoryResult[];
}

export async function searchTags(query: string): Promise<TagResult[]> {
  const supabase = await createSupabaseServerClient();

  // Get all published posts with their tags
  const { data, error } = await supabase
    .from("posts")
    .select("tags")
    .eq("status", "published");

  if (error) {
    console.error("Search tags error:", error);
    return [];
  }

  // Aggregate tags and count occurrences
  const tagMap = new Map<string, number>();
  data?.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      }
    });
  });

  // Convert to array and sort by count
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
