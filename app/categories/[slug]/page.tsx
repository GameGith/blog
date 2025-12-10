import { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/data/categories";
import { CategoryPostList } from "@/components/blog/category-post-list";

type Params = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  const title = category?.name || slug;
  const description = category?.description || `Artikel terkini seputar ${title}`;

  return {
    title: `Kategori: ${title}`,
    description,
    openGraph: {
      title: `Kategori: ${title}`,
      description,
    },
    twitter: {
      title: `Kategori: ${title}`,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  const categoryName = category?.name || slug;
  const categoryDescription = category?.description;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Kategori: <span className="text-teal-500">{categoryName}</span>
        </h1>
        {categoryDescription && (
          <p className="text-muted-foreground">{categoryDescription}</p>
        )}
      </div>

      <CategoryPostList slug={slug} />
    </main>
  );
}
