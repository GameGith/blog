"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ImageIcon, Eye } from "lucide-react";

import type { BlogPost } from "@/types/blog";
import { getImageUrl } from "@/lib/utils";

type Props = {
  posts: BlogPost[];
};

export function RelatedPosts({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className="mx-auto max-w-6xl mt-12 px-4 py-12 sm:px-6 lg:px-8 border-t border-border">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Related Posts</h2>
          <p className="text-sm text-muted-foreground">
            Artikel terkait yang mungkin Anda suka
          </p>
        </div>
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          View All
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group flex gap-4 items-start"
          >
            <div className="flex-1 space-y-2">
              <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>
                  {post.published_at
                    ? format(new Date(post.published_at), "dd MMM yyyy", {
                        locale: id,
                      })
                    : "Draft"}
                </span>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {post.views || 0}
                </div>
              </div>
            </div>
            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md bg-muted">
              {post.cover_url ? (
                <Image
                  src={getImageUrl(post.cover_url)!}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground/20">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
