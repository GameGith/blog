import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PenLine, Sparkles, TimerReset } from "lucide-react";

import type { DashboardStats } from "@/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const icons = [Sparkles, PenLine, TimerReset];

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const items = [
    {
      label: "Total Tulisan",
      value: stats.totalPosts,
      icon: icons[0],
      description: "Jumlah seluruh konten",
    },
    {
      label: "Published",
      value: stats.published,
      icon: icons[1],
      description: "Artikel live di blog",
    },
    {
      label: "Draft",
      value: stats.drafts,
      icon: icons[2],
      description: "Menunggu dirilis",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="border-border/50 bg-card/80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        );
      })}
      <Card className="md:col-span-3 border-dashed border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Aktivitas Terkini
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {stats.lastUpdated
            ? `Perubahan terakhir ${format(new Date(stats.lastUpdated), "dd MMM yyyy, HH:mm", { locale: id })}`
            : "Belum ada aktivitas"}
        </CardContent>
      </Card>
    </div>
  );
}

