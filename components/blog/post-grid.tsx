"use client";

import { motion } from "framer-motion";
import type { BlogPost } from "@/types/blog";
import { PostCard } from "@/components/blog/post-card";

type Props = {
  posts: BlogPost[];
};

export function PostGrid({ posts }: Props) {
  return (
    <section>
      <motion.div
        layout
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </motion.div>

      {!posts.length && (
        <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
          Belum ada artikel di sini.
        </div>
      )}
    </section>
  );
}
