"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";

import type { Category } from "@/types/category";
import { CategoryDialog } from "@/components/dashboard/category-dialog";
import { DeleteCategoryDialog } from "@/components/dashboard/delete-category-dialog";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Kelola Kategori
            </h1>
            <p className="text-muted-foreground">
              Tambah, edit, atau hapus kategori artikel
            </p>
          </div>
          <Button onClick={() => setShowAddDialog(true)} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kategori
          </Button>
        </div>

        {categories.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <p className="text-muted-foreground mb-4">Belum ada kategori</p>
            <Button onClick={() => setShowAddDialog(true)} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Buat Kategori Pertama
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((category) => {
              return (
                <Link
                  key={category.id}
                  href={`/dashboard/categories/${category.slug}`}
                  className="block group"
                >
                  <Card className="relative h-full overflow-hidden border bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30">
                    {/* Top bar indicator */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="p-4 sm:p-6">
                      {/* Header with menu */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base sm:text-lg truncate group-hover:text-primary transition-colors">
                            {category.name}
                          </h4>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.preventDefault()}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.preventDefault();
                                setEditCategory(category);
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.preventDefault();
                                setDeleteCategory(category);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Slug */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <p className="text-xs font-mono text-muted-foreground/70 truncate">
                          {category.slug}
                        </p>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        {category.description ? (
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {category.description}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm text-muted-foreground/40 italic">
                            Belum ada deskripsi
                          </p>
                        )}
                      </div>

                      {/* Footer with count */}
                      <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Artikel
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-black tabular-nums text-foreground/90 group-hover:text-primary transition-colors">
                            {category.postCount || 0}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            post
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
