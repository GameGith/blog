"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toggleLike } from "@/lib/actions/interactions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
    if (likedPosts.includes(slug)) {
      setHasLiked(true);
    }
  }, [slug]);

  const handleLike = async () => {
    setIsLoading(true);
    const isLiking = !hasLiked;

    // Optimistic update
    setHasLiked(isLiking);
    setLikes((prev) => (isLiking ? prev + 1 : prev - 1));

    try {
      const result = await toggleLike(slug, isLiking);

      if (result.error) {
        // Revert on error
        setHasLiked(!isLiking);
        setLikes((prev) => (isLiking ? prev - 1 : prev + 1));
        toast.error("Like Gagal");
      } else {
        // Update localStorage
        const likedPosts = JSON.parse(
          localStorage.getItem("liked_posts") || "[]"
        );
        if (isLiking) {
          if (!likedPosts.includes(slug)) {
            likedPosts.push(slug);
          }
        //   toast.success("Terima kasih atas apresiasi Anda!");
        } else {
          const index = likedPosts.indexOf(slug);
          if (index > -1) {
            likedPosts.splice(index, 1);
          }
        }
        localStorage.setItem("liked_posts", JSON.stringify(likedPosts));

        // Sync with server result just in case
        if (result.likes !== undefined) {
          setLikes(result.likes);
        }
      }
    } catch (error) {
      // Revert on error
      setHasLiked(!isLiking);
      setLikes((prev) => (isLiking ? prev - 1 : prev + 1));
      toast.error("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-sm transition",
        hasLiked
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-foreground",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
      onClick={handleLike}
      disabled={isLoading}
    >
      <Heart className={cn("size-4", hasLiked && "fill-current")} />
      <span>{likes}</span>
      <span className="sr-only">Likes</span>
    </button>
  );
}
