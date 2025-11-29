import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function PostCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/80 shadow-lg">
      {/* Cover Image Skeleton */}
      <div className="relative h-48 w-full animate-pulse bg-gradient-to-br from-muted/50 to-muted" />
      
      <CardContent className="space-y-3 p-5">
        {/* Category Skeleton */}
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-full animate-pulse rounded bg-muted" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
        </div>
        
        {/* Excerpt Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted/70" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted/70" />
        </div>
        
        {/* Author Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 animate-pulse rounded bg-muted/70" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted/70" />
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between border-t border-border/40 p-5">
        {/* Date Skeleton */}
        <div className="h-4 w-24 animate-pulse rounded bg-muted/70" />
        
        {/* Read Button Skeleton */}
        <div className="h-4 w-16 animate-pulse rounded bg-muted/70" />
      </CardFooter>
    </Card>
  );
}

export function PostGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
