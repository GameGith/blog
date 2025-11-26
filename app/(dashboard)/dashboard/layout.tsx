import Link from "next/link";

import { requireAdmin, getCurrentProfile, getSession } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/dashboard/user-nav";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const session = await getSession();
  const profile = await getCurrentProfile();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(120,120,120,0.2),transparent_45%)]">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-muted-foreground hover:text-foreground"
            >
              ← Kembali ke Blog
            </Link>
            <Button asChild variant="secondary" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/editor">Tulis Baru</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/categories">Kategori</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session && (
              <UserNav
                session={session}
                displayName={profile?.display_name}
                email={profile?.email}
                avatarUrl={profile?.avatar_url}
              />
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
