"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { deletePost, upsertPost } from "@/lib/data/posts";
import { postSchema, type PostFormValues } from "@/lib/validators/post";

export async function savePostAction(values: PostFormValues) {
  await requireAdmin();
  const payload = postSchema.parse(values);
  const post = await upsertPost(payload);
  revalidatePath("/dashboard");
  revalidatePath("/");
  return { success: true, post };
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await deletePost(id);
  revalidatePath("/dashboard");
  revalidatePath("/");
  return { success: true };
}

