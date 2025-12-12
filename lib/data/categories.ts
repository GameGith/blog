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

export const getTotalCategories = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id", { count: "exact" });

  if (error) {
    console.error("Error fetching categories count:", error);
    return 0;
  }

  return data?.length || 0;
});

export const getCategoriesWithPostCount = cache(async () => {
  const supabase = await createSupabaseServerClient();

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
    return [];
  }

  // Get post counts for each category
  const { data: postCounts, error: countsError } = await supabase
    .from("posts")
    .select("category_id", { count: "exact" })
    .eq("status", "published");

  if (countsError) {
    console.error("Error fetching post counts:", countsError);
    return categories as Category[];
  }

  // Create a map of category_id -> post count
  const countMap = new Map<string, number>();
  postCounts?.forEach((post) => {
    if (post.category_id) {
      countMap.set(post.category_id, (countMap.get(post.category_id) || 0) + 1);
    }
  });

  // Add post count to each category
  return categories.map((cat) => ({
    ...cat,
    postCount: countMap.get(cat.id) || 0,
  })) as Array<Category & { postCount: number }>;
});
