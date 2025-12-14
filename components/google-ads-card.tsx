"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  index: number;
};

export function GoogleAdsCard({ index }: Props) {
  const isMobileBig = index % 5 === 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [mounted]);

  if (!mounted) {
    return <div className="h-36 md:h-48" aria-hidden />;
  }

  return (
    <Card
      className={cn(
        "flex overflow-hidden border-border/50 bg-card/80 shadow-lg",
        "p-0 gap-0",
        // Mobile: Conditional Layout - same as PostCard
        isMobileBig ? "flex-col" : "flex-row h-36 items-stretch",
        // Tablet & Desktop: Always Vertical
        "md:flex-col md:h-full md:items-stretch"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          // Mobile
          isMobileBig ? "h-48 w-full" : "w-1/3 h-full shrink-0",
          // Tablet & Desktop
          "md:h-48 md:w-full md:shrink-0"
        )}
        suppressHydrationWarning
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
          data-ad-client="ca-pub-7845294761182815"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <div
        className={cn(
          "flex flex-1 items-center justify-center bg-muted/30",
          isMobileBig ? "p-5" : "p-3",
          "md:p-5"
        )}
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Advertisement
        </p>
      </div>
    </Card>
  );
}
