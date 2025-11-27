import { getPublishedPosts } from "@/lib/data/posts";
import { PostGrid } from "@/components/blog/post-grid";

export const revalidate = 60;

export const metadata = {
  title: "Semua Artikel | Mubarrok Tech Blog",
  description: "Jelajahi semua artikel tentang AI, Web Dev, dan teknologi terkini.",
};

export default async function PostsPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Semua Artikel
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Temukan tutorial, panduan, dan wawasan terbaru seputar teknologi.
        </p>
      </div>

      <PostGrid posts={posts} />
    </main>
  );
}
