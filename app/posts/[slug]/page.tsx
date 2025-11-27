import { notFound } from "next/navigation";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { getPostBySlug, getPublishedPostsForBuild } from "@/lib/data/posts";
import { MDXRenderer } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/blog/share-buttons";

type Params = {
  slug: string;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedPostsForBuild();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const authorName =
    post.author?.display_name ?? post.author?.email ?? "Penulis tamu";

  const initials = authorName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);
  const publishedDate = post.published_at
    ? format(new Date(post.published_at), "dd MMM yyyy", { locale: id })
    : null;

  const postUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  }/posts/${post.slug}`;

  return (
    <>
      {/* Blog Article */}
      <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl">
          {/* Avatar Media */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
              <div className="shrink-0">
                {post.author?.avatar_url ? (
                  <Image
                    className="size-10 rounded-full object-cover"
                    src={post.author.avatar_url}
                    alt={authorName}
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {initials || "AU"}
                  </div>
                )}
              </div>

              <div className="grow">
                <div className="flex justify-between items-center gap-x-2">
                  <div>
                    <div className="block mb-1">
                      <span className="font-semibold text-foreground">
                        {authorName}
                      </span>
                    </div>

                    <ul className="text-xs text-muted-foreground">
                      {publishedDate && (
                        <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-muted-foreground/50 before:rounded-full">
                          {publishedDate}
                        </li>
                      )}
                      <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-muted-foreground/50 before:rounded-full">
                        {readingTime} min read
                      </li>
                    </ul>
                  </div>

                  {/* Instagram Button */}
                  <div>
                    <Link
                      href="https://instagram.com/hsnmbrr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-accent transition"
                    >
                      <svg
                        className="size-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Avatar Media */}

          {/* Content */}
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
              {post.category && (
                <Link
                  href={`/categories/${post.category.slug}`}
                  className="inline-flex items-center gap-x-1.5 text-sm font-medium text-teal-500 hover:text-teal-600 hover:underline"
                >
                  {post.category.name}
                </Link>
              )}
              <h1 className="text-2xl font-bold md:text-3xl">{post.title}</h1>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground">{post.excerpt}</p>
              )}
            </div>

            {post.cover_url && (
              <figure>
                <Image
                  className="w-full object-cover rounded-xl"
                  src={post.cover_url}
                  alt={post.title}
                  width={800}
                  height={450}
                  draggable={false}
                  priority
                />
              </figure>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRenderer source={post.content} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`}>
                    <Badge
                      variant="secondary"
                      className="rounded-full hover:bg-teal-500/10 hover:text-teal-500 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* End Content */}
        </div>
      </div>
      {/* End Blog Article */}

      {/* Sticky Share Group */}
      <div className="sticky bottom-6 inset-x-0 text-center z-50">
        <div className="inline-block bg-background border border-border shadow-lg rounded-full py-3 px-4">
          <div className="flex items-center gap-x-1.5">
            {/* Like Button */}
            <button
              type="button"
              className="flex items-center gap-x-2 text-sm text-muted-foreground hover:text-foreground transition"
              title="Like"
            >
              <Heart className="size-4" />
              <span className="hidden sm:inline">0</span>
            </button>

            <div className="block h-3 border-e border-border mx-3"></div>

            {/* Comment Button */}
            <button
              type="button"
              className="flex items-center gap-x-2 text-sm text-muted-foreground hover:text-foreground transition"
              title="Comment"
            >
              <MessageCircle className="size-4" />
              <span className="hidden sm:inline">0</span>
            </button>

            <div className="block h-3 border-e border-border mx-3"></div>

            {/* Share Dropdown */}
            <ShareButtons
              url={postUrl}
              title={post.title}
              description={post.excerpt || undefined}
            />
          </div>
        </div>
      </div>
      {/* End Sticky Share Group */}
    </>
  );
}
