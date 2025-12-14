"use client";

import { motion } from "framer-motion";
import type { BlogPost } from "@/types/blog";
import { PostCard } from "@/components/blog/post-card";
import { GoogleAdsCard } from "@/components/google-ads-card";

type Props = {
  posts: BlogPost[];
};

export function PostGrid({ posts }: Props) {
  // Insert ad after every 6 posts
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < posts.length; i++) {
      items.push(<PostCard key={posts[i].id} post={posts[i]} index={i} />);

      // Insert ad after 6th, 12th, 18th post, etc.
      if ((i + 1) % 6 === 0 && i < posts.length - 1) {
        items.push(<GoogleAdsCard key={`ad-${i}`} index={i + 1} />);
      }
    }
    return items;
  };

  return (
    <section>
      <motion.div
        layout
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {renderItems()}
      </motion.div>

      {!posts.length && (
        <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
          Belum ada artikel di sini.
        </div>
      )}
    </section>
  );
}
