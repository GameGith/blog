"use client";

import { PostGrid } from "@/components/blog/post-grid";
import { PostGridSkeleton } from "@/components/blog/post-skeleton";
import { usePosts } from "@/hooks/use-posts";

export default function PostsPage() {
  const { posts, isLoading, isError } = usePosts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Semua Artikel
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Temukan tutorial, panduan, dan wawasan terbaru seputar teknologi.
        </p>
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
