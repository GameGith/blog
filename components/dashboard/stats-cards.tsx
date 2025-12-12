import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PenLine, Sparkles, TimerReset, FolderOpen, Hash } from "lucide-react";

import type { DashboardStats } from "@/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const icons = [Sparkles, PenLine, TimerReset, FolderOpen, Hash];

type StatsCardsProps = {
  stats: DashboardStats;
  totalCategories?: number;
  totalTags?: number;
};

export function StatsCards({
  stats,
  totalCategories = 0,
  totalTags = 0,
}: StatsCardsProps) {
  const items = [
    {
      label: "Total Tulisan",
      value: stats.totalPosts,
      icon: icons[0],
      description: "Jumlah seluruh konten",
      href: null,
    },
    {
      label: "Published",
      value: stats.published,
      icon: icons[1],
      description: "Artikel live di blog",
      href: null,
    },
    {
      label: "Draft",
      value: stats.drafts,
      icon: icons[2],
      description: "Menunggu dirilis",
      href: null,
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: icons[3],
      description: "Total kategori",
      href: "/dashboard/categories",
    },
    {
      label: "Tags",
      value: totalTags,
      icon: icons[4],
      description: "Total tag unik",
      href: null,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </>
        );

        if (item.href) {
          return (
            <Link key={item.label} href={item.href}>
              <Card className="border-border/50 bg-card/80 transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
                {content}
              </Card>
            </Link>
          );
        }

        return (
          <Card key={item.label} className="border-border/50 bg-card/80">
            {content}
          </Card>
        );
      })}
      <Card className="md:col-span-3 lg:col-span-5 border-dashed border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Aktivitas Terkini
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {stats.lastUpdated
            ? `Perubahan terakhir ${format(
                new Date(stats.lastUpdated),
                "dd MMM yyyy, HH:mm",
                { locale: id }
              )}`
            : "Belum ada aktivitas"}
        </CardContent>
      </Card>
    </div>
  );
}
