import { HeroSection } from "@/components/home/hero-section";
import { LatestPostsSection } from "@/components/home/latest-posts-section";
import { PopularPosts } from "@/components/home/popular-posts";
import { TopTags } from "@/components/home/top-tags";
import { GoogleAds, GoogleAdsMultiplex } from "@/components/google-ads";
import {
  getPublishedPosts,
  getPopularPosts,
  getTopTags,
} from "@/lib/data/posts";

export const revalidate = 60;

export default async function Home() {
  const [posts, popularPosts, topTags] = await Promise.all([
    getPublishedPosts(),
    getPopularPosts(10),
    getTopTags(10),
  ]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <HeroSection />

      {/* Ad after hero */}
      <GoogleAds />

      <LatestPostsSection posts={posts} />
      <PopularPosts posts={popularPosts} />

      {/* Multiplex ad before trending */}
      <GoogleAdsMultiplex />

      <TopTags tags={topTags} />
    </main>
  );
}
