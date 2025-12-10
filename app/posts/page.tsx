import { Metadata } from "next";
import { AllPostsList } from "@/components/blog/all-posts-list";

export const metadata: Metadata = {
  title: "Semua Artikel",
  description: "Temukan tutorial, panduan, dan wawasan terbaru seputar teknologi.",
  openGraph: {
    title: "Semua Artikel - Mubarrok Tech Blog",
    description: "Temukan tutorial, panduan, dan wawasan terbaru seputar teknologi.",
  },
};

export default function PostsPage() {
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

      <AllPostsList />
    </main>
  );
}
