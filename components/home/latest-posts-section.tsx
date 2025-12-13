"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";

type Props = {
  posts: BlogPost[];
};

const INITIAL_DISPLAY = 24;
const LOAD_MORE_COUNT = 6;

export function LatestPostsSection({ posts }: Props) {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const [isLoading, setIsLoading] = useState(false);

  const visiblePosts = posts.slice(0, displayCount);
  const hasMore = displayCount < posts.length;
  const hasLoadedMore = displayCount > INITIAL_DISPLAY;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + LOAD_MORE_COUNT, posts.length));
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight">Artikel Terbaru</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </div>

      <motion.div
        layout
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {visiblePosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </motion.div>

      {!posts.length && (
        <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
          Belum ada artikel di sini.
        </div>
      )}

      {/* Load More / View All Button */}
      {hasMore && (
        <div className="flex justify-center">
          {hasLoadedMore ? (
            <Button asChild size="lg" className="gap-2 shadow-lg">
              <Link href="/posts">
                View All Posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              size="lg"
              variant="outline"
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Load More
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
