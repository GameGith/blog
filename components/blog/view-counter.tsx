"use client";

import { useEffect } from "react";
import { incrementView } from "@/lib/actions/interactions";

export function ViewCounter({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed_${slug}`;
    const hasViewed = localStorage.getItem(key);

    if (!hasViewed) {
      incrementView(slug);
      localStorage.setItem(key, "true");
    }
  }, [slug]);

  return null;
}
