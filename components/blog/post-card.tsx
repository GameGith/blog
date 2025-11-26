"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import type { BlogPost } from "@/types/blog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  post: BlogPost;
  index: number;
};

export function PostCard({ post, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="overflow-hidden border-border/50 bg-card/80 shadow-lg transition group-hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          {post.cover_url ? (
            <Image
              src={post.cover_url}
              alt={post.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20 text-muted-foreground">
              /cover/{post.slug}
            </div>
          )}
          <div className="absolute left-4 top-4 flex gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-background/80">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardContent className="space-y-3 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {post.category?.name || "Artikel"}
          </p>
          <h3 className="text-xl font-semibold leading-tight tracking-tight">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {post.excerpt || "Belum ada ringkasan singkat."}
          </p>
          {post.author && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {post.author.display_name ?? post.author.email}
              </span>
              <span>•</span>
              <span>{post.author.role}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-border/40 p-5 text-sm text-muted-foreground">
          <div>
            {post.published_at
              ? format(new Date(post.published_at), "dd MMM yyyy", {
                  locale: id,
                })
              : "Draft"}
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center gap-1 text-primary transition hover:gap-2"
          >
            Baca <ArrowUpRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
