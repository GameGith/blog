import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { getCategoriesAction } from "@/app/(dashboard)/dashboard/_actions/categories";
import { CategoriesTable } from "@/components/dashboard/categories-table";

export const metadata: Metadata = {
  title: "Kelola Kategori",
};

export default async function CategoriesPage() {
  await requireAdmin();
  const { categories } = await getCategoriesAction();

  return (
    <div className="space-y-6">
      <CategoriesTable categories={categories} />
    </div>
  );
}
