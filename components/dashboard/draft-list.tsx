import Link from "next/link";
import { Sparkles } from "lucide-react";

import type { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DraftList({ posts }: { posts: BlogPost[] }) {
  const drafts = posts.filter((post) => post.status === "draft").slice(0, 4);

  if (!drafts.length) {
    return (
      <Card className="border-dashed border-2 border-primary/30 bg-card/50">
        <CardHeader className="text-sm font-medium text-muted-foreground">
          Belum ada draft. Mulai tulis ide baru.
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-border/40 bg-card/70">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Draft Aktif</p>
          <p className="text-xs text-muted-foreground">
            Lanjutkan tulisan yang sedang diproses.
          </p>
        </div>
        <Badge variant="outline" className="gap-1 text-xs">
          <Sparkles className="h-3.5 w-3.5" />
          {drafts.length} draft
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {drafts.map((draft) => (
          <Link
            key={draft.id}
            href={`/dashboard/editor/${draft.id}`}
            className="block rounded-xl border border-border/40 bg-background/40 px-4 py-3 transition hover:border-primary/60"
          >
            <p className="font-medium">{draft.title}</p>
            <p className="text-xs text-muted-foreground">
              {draft.excerpt || "Belum ada ringkasan"}
            </p>
            {draft.author && (
              <p className="text-xs text-muted-foreground">
                Oleh {draft.author.display_name ?? draft.author.email}
              </p>
            )}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

