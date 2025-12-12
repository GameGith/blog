"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getImageUrl, cn } from "@/lib/utils";

interface LatestPostsCarouselProps {
  posts: BlogPost[];
}

export function LatestPostsCarousel({ posts }: LatestPostsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Max 10 posts + 1 card "View All Posts"
  const maxPosts = 10;
  const displayPosts = posts.slice(0, maxPosts);
  const totalSlides = displayPosts.length + 1; // +1 untuk card "View All Posts"

  // Desktop: 3 items, Mobile: 1 item
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, totalSlides - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Latest Posts</h2>
          <p className="text-sm text-muted-foreground">
            Artikel terbaru dari blog kami
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {displayPosts.map((post) => (
            <div
              key={post.id}
              className="w-full shrink-0 px-2"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <Card className="flex h-full flex-col overflow-hidden border-border/50 bg-card/80 p-0 gap-0 shadow-lg transition hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  {post.cover_url ? (
                    <Image
                      src={getImageUrl(post.cover_url)!}
                      alt={post.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition duration-500 hover:scale-105"
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
                        className="bg-background/80"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute right-4 top-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/80 gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      {post.views || 0}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <CardContent className="space-y-3 p-5">
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
                    <Link href={`/posts/${post.slug}`}>
                      <h3 className="font-semibold text-xl leading-tight tracking-tight transition-colors hover:text-primary">
                        {post.title}
                      </h3>
                    </Link>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t border-border/40 p-5 text-sm text-muted-foreground">
                    <div className="text-xs">
                      {post.published_at
                        ? format(
                            new Date(post.published_at),
                            "dd MMM yyyy, HH:mm",
                            {
                              locale: id,
                            }
                          )
                        : "Draft"}
                    </div>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary transition hover:gap-2"
                    >
                      <span>Baca</span> <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            </div>
          ))}

          {/* View All Posts Card */}
          <div
            className="w-full shrink-0 px-2"
            style={{ width: `${100 / itemsPerView}%` }}
          >
            <Link
              href="/posts"
              className="group flex h-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border/40 bg-linear-to-br from-primary/5 via-primary/10 to-transparent p-8 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="rounded-full bg-primary/10 p-4 transition-transform group-hover:scale-110">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="mb-1 text-lg font-semibold">View All Posts</h3>
                <p className="text-sm text-muted-foreground">
                  Jelajahi semua artikel kami
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
