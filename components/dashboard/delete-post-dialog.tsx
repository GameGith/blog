"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import type { BlogPost } from "@/types/blog";
import { deletePostAction } from "@/app/(dashboard)/dashboard/_actions/posts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  post: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeletePostDialog({ post, open, onOpenChange }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!post) return;

    startTransition(async () => {
      try {
        await deletePostAction(post.id);
        toast.success("Artikel berhasil dihapus");
        onOpenChange(false);
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal menghapus artikel"
        );
      }
    });
  };

  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>Hapus Artikel?</DialogTitle>
          </div>
          <DialogDescription className="pt-3">
            Anda yakin ingin menghapus artikel{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{post.title}&rdquo;
            </span>
            ?
            <br />
            <br />
            Tindakan ini tidak dapat dibatalkan dan artikel akan dihapus secara
            permanen dari database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={pending}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus Artikel
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
