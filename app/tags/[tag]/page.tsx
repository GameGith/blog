"use client";

import { useParams } from "next/navigation";
import { usePostsByTag } from "@/hooks/use-posts";
import { PostGrid } from "@/components/blog/post-grid";
import { PostGridSkeleton } from "@/components/blog/post-skeleton";

export default function TagPage() {
  const params = useParams();
  const tag = decodeURIComponent(params.tag as string);
  const { posts, isLoading, isError } = usePostsByTag(tag);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tag: <span className="text-teal-500">#{tag}</span>
        </h1>
        <p className="text-muted-foreground">
          {!isLoading && posts && `Menampilkan ${posts.length} artikel dengan tag ini.`}
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
