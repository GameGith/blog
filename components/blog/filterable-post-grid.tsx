"use client";
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import type { BlogPost } from "@/types/blog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/blog/post-card";

type Props = {
  posts: BlogPost[];
};

export function FilterablePostGrid({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [posts]);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    posts.forEach((post) => {
      if (post.category) {
        map.set(post.category.slug, post.category.name);
      }
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
        post.author?.display_name
          ?.toLowerCase()
          .includes(query.toLowerCase()) ||
        post.author?.email?.toLowerCase().includes(query.toLowerCase());
      const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
      const matchesCategory = activeCategory
        ? post.category?.slug === activeCategory
        : true;
      return matchesQuery && matchesTag && matchesCategory;
    });
  }, [posts, query, activeTag, activeCategory]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Cari artikel, MDX, supabase…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-xl"
        />
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-muted-foreground">Filter:</span>
          <Tabs
            defaultValue="semua"
            value={activeCategory ?? "semua"}
            onValueChange={(value) =>
              setActiveCategory(value === "semua" ? null : value)
            }
          >
            <TabsList className="h-9">
              <TabsTrigger value="semua">Semua</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.slug} value={category.slug}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge
          variant={activeTag === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveTag(null)}
        >
          Semua tag
        </Badge>
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={activeTag === tag ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
          >
            #{tag}
          </Badge>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </motion.div>

      {!filtered.length && (
        <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
          Tidak ada artikel yang cocok dengan filter ini. Coba kata kunci atau
          tag lain.
        </div>
      )}
    </section>
  );
}
