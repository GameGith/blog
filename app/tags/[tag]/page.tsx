import { Metadata } from "next";
import { TagPostList } from "@/components/blog/tag-post-list";

type Params = {
  tag: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Tag: #${decodedTag}`,
    description: `Artikel dengan tag #${decodedTag}`,
    openGraph: {
      title: `Tag: #${decodedTag}`,
      description: `Artikel dengan tag #${decodedTag}`,
    },
    twitter: {
      title: `Tag: #${decodedTag}`,
      description: `Artikel dengan tag #${decodedTag}`,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tag: <span className="text-teal-500">#{decodedTag}</span>
        </h1>
      </div>

      <TagPostList tag={decodedTag} />
    </main>
  );
}
