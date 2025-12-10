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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Jelajahi Berita Lainnya</h2>
        <p className="text-muted-foreground mb-8">
          Belajar aset crypto dan teknologi blockchain dengan mudah tanpa ribet.
        </p>

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
      </div>
    </div>
  );
}
