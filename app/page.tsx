import { getPublishedPosts } from "@/lib/data/posts";
import { HeroSection } from "@/components/blog/hero-section";
import { FilterablePostGrid } from "@/components/blog/filterable-post-grid";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <HeroSection />

      {/* Topics Badge */}
      <div className="flex flex-wrap items-center justify-center gap-3 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs font-medium backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Updated Daily
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs font-medium backdrop-blur-sm">
          🤖 Artificial Intelligence
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs font-medium backdrop-blur-sm">
          🧠 Machine Learning
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs font-medium backdrop-blur-sm">
          ⚡ Web Development
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs font-medium backdrop-blur-sm">
          ☁️ Cloud Computing
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-xs font-medium backdrop-blur-sm">
          🚀 Tech Trends
        </div>
      </div>

      <FilterablePostGrid posts={posts} />
    </main>
  );
}
