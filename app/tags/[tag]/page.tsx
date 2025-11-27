import { getPostsByTag } from "@/lib/data/posts";
import { PostGrid } from "@/components/blog/post-grid";

export const revalidate = 60;

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `Artikel Tag #${decodedTag} | Mubarrok Tech Blog`,
    description: `Kumpulan artikel terbaru dengan tag #${decodedTag}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tag: <span className="text-teal-500">#{decodedTag}</span>
        </h1>
        <p className="text-muted-foreground">
          Menampilkan {posts.length} artikel dengan tag ini.
        </p>
      </div>

      <PostGrid posts={posts} />
    </main>
  );
}
