"use client";

import Link from "next/link";
import { Hash, TrendingUp } from "lucide-react";

interface TopTagsProps {
  tags: Array<{ name: string; count: number }>;
}

export function TopTags({ tags }: TopTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Trending Topics</h2>
        <p className="text-sm text-muted-foreground">
          Topik yang sedang populer di blog kami
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag, index) => {
          const isTop3 = index < 3;

          return (
            <Link key={tag.name} href={`/tags/${tag.name}`} className="group">
              <div className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-card px-4 py-2.5 transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-md">
                <Hash className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="font-medium text-foreground">{tag.name}</span>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-muted px-1.5 text-xs font-semibold text-muted-foreground">
                  {tag.count}
                </span>
                {isTop3 && (
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
