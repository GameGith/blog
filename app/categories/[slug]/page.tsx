import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/data/posts";
import { PostGrid } from "@/components/blog/post-grid";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: category } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", slug)
    .single();

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan",
    };
  }

  return {
    title: `Artikel Kategori ${category.name} | Mubarrok Tech Blog`,
    description: `Kumpulan artikel terbaru seputar ${category.name}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);
  const supabase = await createSupabaseServerClient();
  const { data: category } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Kategori: <span className="text-teal-500">{category.name}</span>
        </h1>
        {category.description && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
      </div>

      <PostGrid posts={posts} />
    </main>
  );
}
