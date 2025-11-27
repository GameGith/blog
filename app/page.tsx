import { getPublishedPosts } from "@/lib/data/posts";
import { HeroSection } from "@/components/blog/hero-section";
import { PostGrid } from "@/components/blog/post-grid";

export const revalidate = 60;

export default async function Home() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <HeroSection />

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Artikel Terbaru</h2>
        </div>
        
        <PostGrid posts={posts} />
      </div>
    </main>
  );
}
