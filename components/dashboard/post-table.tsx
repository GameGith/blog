"use client";

import { useMemo, useState, useTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { BlogPost } from "@/types/blog";
import { savePostAction } from "@/app/(dashboard)/dashboard/_actions/posts";
import { DeletePostDialog } from "@/components/dashboard/delete-post-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  posts: BlogPost[];
};

export function PostTable({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const [deletePost, setDeletePost] = useState<BlogPost | null>(null);
  const router = useRouter();

  const filtered = useMemo(() => {
    const value = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(value) ||
        post.tags.some((tag) => tag.toLowerCase().includes(value))
    );
  }, [posts, query]);

  const mutatePost = (post: BlogPost, nextStatus: "draft" | "published") => {
    startTransition(async () => {
      try {
        await savePostAction({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          cover_url: post.cover_url ?? "",
          tags: post.tags.join(","),
          category_id: post.category_id ?? "",
          status: nextStatus,
          published_at: post.published_at ?? "",
        });
        toast.success("Status artikel diperbarui");
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal memperbarui artikel"
        );
      }
    });
  };

  return (
    <>
      <DeletePostDialog
        post={deletePost!}
        open={!!deletePost}
        onOpenChange={(open) => !open && setDeletePost(null)}
      />
      <div className="space-y-4 rounded-2xl border border-border/40 bg-card/60 p-5 shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Daftar Artikel</h3>
            <p className="text-sm text-muted-foreground">
              Kelola draft, jadwal publish, dan arsip.
            </p>
          </div>
          <Input
            placeholder="Cari judul atau tag…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="md:max-w-xs"
          />
        </div>
        <div className="rounded-xl border border-border/40 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Penulis
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Tags</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Diperbarui
                  </TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="max-w-[150px] sm:max-w-[250px] md:max-w-[350px]">
                      <div className="flex flex-col gap-1">
                        <span
                          className="font-medium truncate"
                          title={post.title}
                        >
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          /posts/{post.slug}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">
                          {post.author?.display_name ??
                            post.author?.email ??
                            "Tidak diketahui"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.author?.role ?? "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "outline"
                        }
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(post.updated_at), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/editor/${post.id}`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={pending}
                            onClick={() =>
                              mutatePost(
                                post,
                                post.status === "published"
                                  ? "draft"
                                  : "published"
                              )
                            }
                          >
                            {post.status === "published"
                              ? "Unpublish"
                              : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeletePost(post)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-sm">
                      Belum ada artikel
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
