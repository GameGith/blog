"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import type { Category } from "@/types/category";
import { CategoryDialog } from "@/components/dashboard/category-dialog";
import { DeleteCategoryDialog } from "@/components/dashboard/delete-category-dialog";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  categories: Array<Category & { postCount?: number }>;
};

export function CategoriesTable({ categories }: Props) {
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <>
      <CategoryDialog
        category={editCategory}
        open={!!editCategory}
        onOpenChange={(open) => {
          if (!open) setEditCategory(null);
        }}
      />
      <CategoryDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <DeleteCategoryDialog
        category={deleteCategory}
        open={!!deleteCategory}
        onOpenChange={(open: boolean) => !open && setDeleteCategory(null)}
      />
      <div className="space-y-4 rounded-2xl border border-border/40 bg-card/60 p-5 shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Daftar Kategori</h3>
            <p className="text-sm text-muted-foreground">
              Kelola kategori untuk artikel blog
            </p>
          </div>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kategori
          </Button>
        </div>
        <div className="rounded-xl border border-border/40 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead className="hidden md:table-cell">Slug</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Deskripsi
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Artikel
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-sm text-muted-foreground">
                      {category.slug}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell max-w-xs truncate text-sm text-muted-foreground">
                      {category.description || "-"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                      <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {category.postCount || 0}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(category.created_at), {
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
                          <DropdownMenuItem
                            onClick={() => setEditCategory(category)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeleteCategory(category)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-sm">
                      Belum ada kategori
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
