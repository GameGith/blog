import { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/data/posts";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://idcode.my.id";

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...postEntries];
}
