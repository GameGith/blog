import { cache } from "react";
import slugify from "slugify";

import type { BlogPost, DashboardStats, PostStatus } from "@/types/blog";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseBuildClient } from "@/lib/supabase/client-build";
import { postSchema, type PostFormValues } from "@/lib/validators/post";

const POST_WITH_AUTHOR = `*, 
  author:profiles!posts_author_id_fkey(
    id,
    display_name,
    email,
    role,
    avatar_url,
    bio,
    created_at,
    updated_at
  ),
  category:categories!posts_category_id_fkey(
    id,
    name,
    slug,
    description,
    created_at,
    updated_at
  )` as const;

export const getPublishedPosts = cache(async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("posts")
    .select(POST_WITH_AUTHOR)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BlogPost[];
});

/**
 * Versi build-time dari getPublishedPosts
 * Digunakan untuk generateStaticParams dan operasi build-time lainnya
 * Tidak menggunakan cookies, hanya untuk read-only operations
 */
export async function getPublishedPostsForBuild() {
  const supabase = createSupabaseBuildClient();

  const { data, error } = await supabase
    .from("posts")
    .select(POST_WITH_AUTHOR)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BlogPost[];
}

export const getAllPosts = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_WITH_AUTHOR)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BlogPost[];
});

export const getPostBySlug = cache(async (slug: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_WITH_AUTHOR)
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return data as BlogPost;
});

export const getPostById = cache(async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_WITH_AUTHOR)
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data as BlogPost;
});

export const getPostsByCategory = cache(async (slug: string) => {
  const supabase = await createSupabaseServerClient();

  // First get category id by slug
  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!category) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(POST_WITH_AUTHOR)
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BlogPost[];
});

export const getPostsByTag = cache(async (tag: string) => {
  const supabase = await createSupabaseServerClient();

  // Supabase doesn't support array contains on text[] directly with simple filter easily for all cases,
  // but .contains('tags', [tag]) works for array columns
  const { data, error } = await supabase
    .from("posts")
    .select(POST_WITH_AUTHOR)
    .eq("status", "published")
    .contains("tags", [tag])
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BlogPost[];
});

export const getDashboardStats = cache(async (): Promise<DashboardStats> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("status, updated_at");

  if (error) {
    throw new Error(error.message);
  }

  const stats: DashboardStats = {
    totalPosts: data?.length ?? 0,
    drafts: data?.filter((item) => item.status === "draft").length ?? 0,
    published: data?.filter((item) => item.status === "published").length ?? 0,
    lastUpdated: data?.[0]?.updated_at ?? null,
  };

  return stats;
});

export async function upsertPost(input: PostFormValues) {
  const supabase = await createSupabaseServerClient();
  const parsed = postSchema.parse(input);
  const postId = parsed.id && parsed.id.length ? parsed.id : null;
  const computedSlug =
    parsed.slug ||
    slugify(parsed.title, {
      lower: true,
      strict: true,
    });

  const payload = {
    slug: computedSlug,
    title: parsed.title,
    excerpt: parsed.excerpt || null,
    content: parsed.content,
    cover_url: parsed.cover_url || null,
    category_id:
      parsed.category_id && parsed.category_id.length > 0
        ? parsed.category_id
        : null,
    tags: parsed.tags?.length
      ? parsed.tags.split(",").map((t) => t.trim())
      : [],
    status: parsed.status as PostStatus,
    published_at:
      parsed.status === "published"
        ? parsed.published_at && parsed.published_at.length > 0
          ? parsed.published_at
          : new Date().toISOString()
        : null,
  };

  const { data: session } = await supabase.auth.getUser();

  if (session.user) {
    const fallbackName =
      (session.user.user_metadata as Record<string, string> | undefined)
        ?.display_name ??
      session.user.email?.split("@")[0] ??
      "Penulis";

    await supabase.from("profiles").upsert(
      {
        id: session.user.id,
        email: session.user.email,
        display_name: fallbackName,
      },
      { onConflict: "id" }
    );
  }

  const base = {
    ...payload,
    author_id: session.user?.id ?? null,
  };

  // Generate random stats for new posts
  // Likes: 0 - 500
  // Views: 500 - 1000
  const insertPayload = {
    ...base,
    likes: Math.floor(Math.random() * 501),
    views: Math.floor(Math.random() * (1000 - 500 + 1)) + 500,
  };

  const query = postId
    ? supabase.from("posts").update(base).eq("id", postId).select().single()
    : supabase.from("posts").insert(insertPayload).select().single();

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data as BlogPost;
}

export async function deletePost(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export const getRelatedPosts = cache(async (currentSlug: string, limit = 6) => {
  const supabase = await createSupabaseServerClient();

  // Fetch more posts than needed to randomize
  const { data, error } = await supabase
    .from("posts")
    .select(POST_WITH_AUTHOR)
    .eq("status", "published")
    .neq("slug", currentSlug)
    .limit(20);

  if (error) {
    return [];
  }

  // Shuffle array
  const shuffled = (data || []).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit) as BlogPost[];
});
