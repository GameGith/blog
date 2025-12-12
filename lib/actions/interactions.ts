"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { LRUCache } from "lru-cache";

const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 60 * 1000, // 1 minute
});

function checkRateLimit(ip: string, action: "view" | "like") {
  const key = `${ip}:${action}`;
  const count = rateLimit.get(key) || 0;

  const limit = action === "view" ? 10 : 5; // 10 views/min, 5 likes/min

  if (count >= limit) {
    return false;
  }

  rateLimit.set(key, count + 1);
  return true;
}

async function getClientIp() {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") || "unknown";
}

export async function incrementView(slug: string) {
  const ip = await getClientIp();
  if (!checkRateLimit(ip, "view")) return;

  const supabase = await createSupabaseServerClient();

  // Get post ID from slug
  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!post) return;

  // Upsert post_interactions (create if not exists, update if exists)
  const { data: interaction } = await supabase
    .from("post_interactions")
    .select("views")
    .eq("post_id", post.id)
    .single();

  if (interaction) {
    // Update existing
    await supabase
      .from("post_interactions")
      .update({ views: interaction.views + 1 })
      .eq("post_id", post.id);
  } else {
    // Insert new
    await supabase
      .from("post_interactions")
      .insert({ post_id: post.id, views: 1, likes: 0 });
  }
}

export async function toggleLike(slug: string, increment: boolean) {
  const ip = await getClientIp();
  if (!checkRateLimit(ip, "like")) {
    return { error: "Too many requests. Please try again later." };
  }

  const supabase = await createSupabaseServerClient();

  // Get post ID
  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!post) return { error: "Post not found" };

  // Get or create interaction
  const { data: interaction } = await supabase
    .from("post_interactions")
    .select("likes")
    .eq("post_id", post.id)
    .single();

  if (interaction) {
    // Update existing
    const newLikes = increment
      ? interaction.likes + 1
      : Math.max(0, interaction.likes - 1);

    await supabase
      .from("post_interactions")
      .update({ likes: newLikes })
      .eq("post_id", post.id);

    revalidatePath(`/posts/${slug}`);
    return { likes: newLikes };
  } else {
    // Create new interaction
    const initialLikes = increment ? 1 : 0;
    await supabase
      .from("post_interactions")
      .insert({ post_id: post.id, views: 0, likes: initialLikes });

    revalidatePath(`/posts/${slug}`);
    return { likes: initialLikes };
  }
}
