"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import type { BlogPost } from "@/types/blog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getImageUrl, cn, formatIDDate } from "@/lib/utils";

type Props = {
  post: BlogPost;
  index: number;
};

export function PostCard({ post, index }: Props) {
  const isMobileBig = index % 5 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <Card
        className={cn(
          "flex overflow-hidden border-border/50 bg-card/80 shadow-lg transition group-hover:-translate-y-1",
          // Reset default Card padding/gap
          "p-0 gap-0",
          // Mobile: Conditional Layout
          isMobileBig ? "flex-col" : "flex-row h-36 items-stretch",
          // Tablet & Desktop: Always Vertical
          "md:flex-col md:h-full md:items-stretch"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            // Mobile
            isMobileBig ? "h-48 w-full" : "w-1/3 h-full order-last shrink-0",
            // Tablet & Desktop
            "md:h-48 md:w-full md:order-none md:shrink-0"
          )}
        >
          {post.cover_url ? (
            <Image
              src={getImageUrl(post.cover_url)!}
              alt={post.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
            </div>
          )}
          <div className="absolute left-4 top-4 flex gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={cn(
                  "bg-background/80",
                  !isMobileBig && "hidden md:inline-flex" // Hide tags on small mobile cards
                )}
              >
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="absolute right-4 top-4">
            <Badge
              variant="secondary"
              className={cn(
                "bg-background/80 gap-1",
                !isMobileBig && "hidden md:inline-flex" // Hide views on small mobile cards (moved to content)
              )}
            >
              <Eye className="h-3 w-3" />
              {post.views || 0}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <CardContent
            className={cn("space-y-3", isMobileBig ? "p-5" : "p-3", "md:p-5")}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {post.category ? (
                  <Link
                    href={`/categories/${post.category.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.category.name}
                  </Link>
                ) : (
                  "Artikel"
                )}
              </div>
              {/* Mobile View Count (Small Cards) */}
              {!isMobileBig && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground md:hidden">
                  <Eye className="h-3 w-3" />
                  {post.views || 0}
                </div>
              )}
            </div>
            <Link href={`/posts/${post.slug}`}>
              <h3
                className={cn(
                  "font-semibold leading-tight tracking-tight transition-colors hover:text-primary",
                  isMobileBig ? "text-xl" : "text-base line-clamp-2",
                  "md:text-xl md:line-clamp-none"
                )}
              >
                {post.title}
              </h3>
            </Link>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isMobileBig ? "line-clamp-3" : "hidden", // Hide excerpt on small mobile cards
                "md:line-clamp-3"
              )}
            >
              {post.excerpt || "Belum ada ringkasan singkat."}
            </p>
          </CardContent>
          <CardFooter
            className={cn(
              "flex items-center justify-between border-t border-border/40 text-sm text-muted-foreground",
              isMobileBig ? "p-5" : "px-3 py-2",
              "md:p-5"
            )}
          >
            <div className={cn("text-xs", !isMobileBig && "text-[10px]")}>
              {post.published_at
                ? formatIDDate(post.published_at) ?? "-"
                : "Draft"}
            </div>
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center gap-1 text-primary transition hover:gap-2"
            >
              <span className={cn(!isMobileBig && "hidden md:inline")}>
                Baca
              </span>{" "}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </CardFooter>
        </div>
      </Card>
    </motion.article>
  );
}
