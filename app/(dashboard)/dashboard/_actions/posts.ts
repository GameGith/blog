"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { deletePost, upsertPost } from "@/lib/data/posts";
import { postSchema, type PostFormValues } from "@/lib/validators/post";
import { validateMdx } from "@/lib/validators/mdx";

export async function savePostAction(values: PostFormValues) {
  await requireAdmin();
  const payload = postSchema.parse(values);

  // Validasi MDX syntax sebelum simpan
  const mdxCheck = await validateMdx(payload.content);
  if (!mdxCheck.valid) {
    throw new Error(`MDX Error: ${mdxCheck.error}`);
  }

  const post = await upsertPost(payload);
  revalidatePath("/dashboard");
  revalidatePath("/");

  // Return post data and redirect flag for new posts
  const isNewPost = !values.id || values.id.length === 0;
  return { success: true, post, isNewPost };
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await deletePost(id);
  revalidatePath("/dashboard");
  revalidatePath("/");
  return { success: true };
}
