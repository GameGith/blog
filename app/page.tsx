"use client";

import { HeroSection } from "@/components/blog/hero-section";
import { PostGrid } from "@/components/blog/post-grid";
import { PostGridSkeleton } from "@/components/blog/post-skeleton";
import { usePosts } from "@/hooks/use-posts";

export default function Home() {
  const { posts, isLoading, isError } = usePosts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <HeroSection />

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Artikel Terbaru</h2>
        </div>
        
        {isLoading && <PostGridSkeleton />}

        {isError && (
          <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-8 text-center text-sm text-destructive">
            Gagal memuat artikel. Silakan refresh halaman.
          </div>
        )}

        {!isLoading && !isError && posts && <PostGrid posts={posts} />}
      </div>
    </main>
  );
}
