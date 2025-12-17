import { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getCategoriesAction } from "@/app/(dashboard)/dashboard/_actions/categories";
import { getAllPosts } from "@/lib/data/posts";
import { CategoryPostsTable } from "@/components/dashboard/category-posts-table";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { categories } = await getCategoriesAction();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Kategori Tidak Ditemukan" };
  }

  return {
    title: `Artikel - ${category.name}`,
  };
}

export default async function CategoryPostsPage({ params }: Props) {
  await requireAdmin();
  const { slug } = await params;

  const { categories } = await getCategoriesAction();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = await getAllPosts();
  const categoryPosts = posts.filter((post) => post.category?.slug === slug);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Artikel: {category.name}
        </h1>
        <p className="text-muted-foreground">
          {categoryPosts.length} artikel dalam kategori ini
        </p>
      </div>
      <CategoryPostsTable posts={categoryPosts} category={category} />
    </div>
  );
}
