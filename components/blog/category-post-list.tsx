"use client";

import { usePostsByCategory } from "@/hooks/use-posts";
import { PostGrid } from "@/components/blog/post-grid";
import { PostGridSkeleton } from "@/components/blog/post-skeleton";

interface CategoryPostListProps {
  slug: string;
}

export function CategoryPostList({ slug }: CategoryPostListProps) {
  const { posts, isLoading, isError } = usePostsByCategory(slug);

  if (isLoading) return <PostGridSkeleton />;

  if (isError) {
    return (
      <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-8 text-center text-sm text-destructive">
        Gagal memuat artikel. Silakan refresh halaman.
      </div>
    );
  }

  if (!posts) return null;

  return <PostGrid posts={posts} />;
}
