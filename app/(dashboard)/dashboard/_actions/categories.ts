"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Category } from "@/types/category";

export async function getCategoriesAction() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  // Get post counts for each category
  const { data: postCounts, error: countsError } = await supabase
    .from("posts")
    .select("category_id", { count: "exact" })
    .eq("status", "published");

  if (countsError) {
    console.error("Error fetching post counts:", countsError);
  }

  // Create a map of category_id -> post count
  const countMap = new Map<string, number>();
  postCounts?.forEach((post) => {
    if (post.category_id) {
      countMap.set(post.category_id, (countMap.get(post.category_id) || 0) + 1);
    }
  });

  // Add post count to each category
  const categoriesWithCount = (data ?? []).map((cat) => ({
    ...cat,
    postCount: countMap.get(cat.id) || 0,
  }));

  return {
    categories: categoriesWithCount as Array<Category & { postCount: number }>,
  };
}

export async function createCategoryAction(input: {
  name: string;
  description?: string;
}) {
  const supabase = await createSupabaseServerClient();

  const slug = slugify(input.name, {
    lower: true,
    strict: true,
  });

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: input.name,
      slug,
      description: input.description || null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/categories");
  return { category: data as Category };
}

export async function updateCategoryAction(input: {
  id: string;
  name: string;
  description?: string;
}) {
  const supabase = await createSupabaseServerClient();

  const slug = slugify(input.name, {
    lower: true,
    strict: true,
  });

  const { data, error } = await supabase
    .from("categories")
    .update({
      name: input.name,
      slug,
      description: input.description || null,
    })
    .eq("id", input.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard");
  return { category: data as Category };
}

export async function deleteCategoryAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard");
}
