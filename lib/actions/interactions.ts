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

  const { data: post } = await supabase
    .from("posts")
    .select("id, views")
    .eq("slug", slug)
    .single();

  if (!post) return;

  await supabase
    .from("posts")
    .update({ views: (post.views || 0) + 1 })
    .eq("id", post.id);
}

export async function toggleLike(slug: string, increment: boolean) {
  const ip = await getClientIp();
  if (!checkRateLimit(ip, "like")) {
    return { error: "Too many requests. Please try again later." };
  }

  const supabase = await createSupabaseServerClient();

  const { data: post } = await supabase
    .from("posts")
    .select("id, likes")
    .eq("slug", slug)
    .single();

  if (!post) return { error: "Post not found" };

  const currentLikes = post.likes || 0;
  const newLikes = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1);

  const { error } = await supabase
    .from("posts")
    .update({ likes: newLikes })
    .eq("id", post.id);

  if (error) return { error: error.message };

  revalidatePath(`/posts/${slug}`);
  return { likes: newLikes };
}
