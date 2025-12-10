"use client";

import { usePostsByTag } from "@/hooks/use-posts";
import { PostGrid } from "@/components/blog/post-grid";
import { PostGridSkeleton } from "@/components/blog/post-skeleton";

interface TagPostListProps {
  tag: string;
}

export function TagPostList({ tag }: TagPostListProps) {
  const { posts, isLoading, isError } = usePostsByTag(tag);

  if (isLoading) return <PostGridSkeleton />;

  if (isError) {
    return (
      <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-8 text-center text-sm text-destructive">
        Gagal memuat artikel. Silakan refresh halaman.
      </div>
    );
  }

  if (!posts) return null;

  return (
    <>
      <p className="text-muted-foreground text-center mb-8">
        Menampilkan {posts.length} artikel dengan tag ini.
      </p>
      <PostGrid posts={posts} />
    </>
  );
}
