import Link from "next/link";
import { ArrowUpRight, PenSquare } from "lucide-react";
import { Metadata } from "next";

import { getAllPosts, getDashboardStats, getTotalTags } from "@/lib/data/posts";
import { getTotalCategories } from "@/lib/data/categories";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DraftList } from "@/components/dashboard/draft-list";
import { PostTable } from "@/components/dashboard/post-table";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, posts, totalCategories, totalTags] = await Promise.all([
    getDashboardStats(),
    getAllPosts(),
    getTotalCategories(),
    getTotalTags(),
  ]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border/40 bg-linear-to-br from-background/70 via-background/50 to-primary/5 p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">
              Studio Editor
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Kelola konten, atur draft dan publikasi
            </h1>
            <p className="text-sm text-muted-foreground">
              Semua perubahan otomatis disinkronkan ke Supabase dengan ISR 60
              detik untuk halaman publik.
            </p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/dashboard/editor">
              <PenSquare className="h-4 w-4" />
              Tulis artikel baru
            </Link>
          </Button>
        </div>
      </section>

      <StatsCards
        stats={stats}
        totalCategories={totalCategories}
        totalTags={totalTags}
      />

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <PostTable posts={posts} />
        <div className="space-y-4">
          <DraftList posts={posts} />
          <div className="rounded-2xl border border-border/30 bg-card/60 p-4">
            <p className="text-sm font-semibold">Preview publik</p>
            <p className="text-xs text-muted-foreground">
              Cek tampilan live setelah publish.
            </p>
            <Button asChild variant="link" className="px-0 text-primary">
              <Link href="/" className="inline-flex items-center gap-1 text-sm">
                Buka homepage <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
