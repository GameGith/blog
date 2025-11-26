"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import type { Category } from "@/types/category";
import { getCategoriesAction } from "@/app/(dashboard)/dashboard/_actions/categories";
import { CategoryDialog } from "@/components/dashboard/category-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export function CategorySelect({ value, onChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { categories: data } = await getCategoriesAction();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setShowAddDialog(open);
    if (!open) {
      loadCategories(); // Reload categories after adding
    }
  };

  return (
    <>
      <CategoryDialog open={showAddDialog} onOpenChange={handleDialogClose} />
      <div className="flex gap-2">
        <Select value={value || ""} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue
              placeholder={loading ? "Loading..." : "Pilih kategori"}
            />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
            {categories.length === 0 && !loading && (
              <div className="py-2 text-center text-sm text-muted-foreground">
                Belum ada kategori
              </div>
            )}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setShowAddDialog(true)}
          title="Tambah kategori baru"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
