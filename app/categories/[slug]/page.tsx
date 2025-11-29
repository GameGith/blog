"use client";

import { useParams } from "next/navigation";
import { usePostsByCategory } from "@/hooks/use-posts";
import { PostGrid } from "@/components/blog/post-grid";
import { PostGridSkeleton } from "@/components/blog/post-skeleton";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { posts, isLoading, isError } = usePostsByCategory(slug);

  // Get category name from first post (if available)
  const categoryName = posts?.[0]?.category?.name || slug;
  const categoryDescription = posts?.[0]?.category?.description;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Kategori: <span className="text-teal-500">{categoryName}</span>
        </h1>
        {categoryDescription && (
          <p className="text-muted-foreground">{categoryDescription}</p>
        )}
      </div>

      {isLoading && <PostGridSkeleton />}

      {isError && (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-8 text-center text-sm text-destructive">
          Gagal memuat artikel. Silakan refresh halaman.
        </div>
      )}

      {!isLoading && !isError && posts && <PostGrid posts={posts} />}
    </main>
  );
}
