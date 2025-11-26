"use client";

import { useMemo, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

import type { BlogPost } from "@/types/blog";
import { TAG_SUGGESTIONS } from "@/lib/constants";
import { postSchema, type PostFormValues } from "@/lib/validators/post";
import { savePostAction } from "@/app/(dashboard)/dashboard/_actions/posts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TagInput } from "@/components/editor/tag-input";
import { CategorySelect } from "@/components/editor/category-select";
import { CoverUploader } from "@/components/editor/cover-uploader";
import { MdxLivePreview } from "@/components/editor/mdx-preview";

type Props = {
  post?: BlogPost | null;
};

const defaultValues: PostFormValues = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_url: "",
  tags: "",
  category_id: "",
  status: "draft",
  published_at: "",
};

export function PostEditor({ post }: Props) {
  const [pending, startTransition] = useTransition();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: post
      ? {
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          cover_url: post.cover_url ?? "",
          tags: post.tags.join(","),
          category_id: post.category_id ?? "",
          status: post.status,
          published_at: post.published_at ?? "",
        }
      : defaultValues,
  });

  const tagsValue = useWatch({ control: form.control, name: "tags" });
  const contentValue = useWatch({ control: form.control, name: "content" });
  const statusValue = useWatch({ control: form.control, name: "status" });

  const tags = useMemo(
    () =>
      tagsValue
        ? tagsValue
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    [tagsValue]
  );

  const handleSubmit = (status: "draft" | "published") => {
    startTransition(async () => {
      try {
        // Set status dan validasi dengan nilai yang benar
        const formValues = form.getValues();
        const payload = {
          ...formValues,
          status,
          tags: tags.join(","),
        };

        // Validasi manual dengan status yang benar
        const validated = postSchema.parse(payload);

        const result = await savePostAction(validated);
        toast.success(
          status === "published" ? "Artikel dipublish" : "Draft tersimpan"
        );
        setLastSaved(new Date());
        form.reset({
          ...validated,
          id: result.post.id,
        });
      } catch (error) {
        console.error("Save post error:", error);

        if (error instanceof z.ZodError) {
          // Tampilkan error validasi di form
          error.issues.forEach((issue) => {
            const path = issue.path[0] as keyof PostFormValues;
            if (path) {
              form.setError(path, { message: issue.message });
            }
          });
          toast.error("Periksa form, ada field yang belum valid");
        } else {
          toast.error(
            error instanceof Error ? error.message : "Gagal menyimpan artikel"
          );
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-border/40 bg-card/60 p-6 shadow-lg lg:flex-row">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {post ? "Edit artikel" : "Buat artikel baru"}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Studio Penulisan MDX
                </h2>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Live Preview
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                disabled={pending}
                onClick={() => handleSubmit("draft")}
              >
                Simpan Draft
              </Button>
              <Button
                type="button"
                disabled={pending}
                onClick={() => handleSubmit("published")}
              >
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publikasikan
              </Button>
              {lastSaved && (
                <span className="text-xs text-muted-foreground">
                  Terakhir disimpan {format(lastSaved, "dd MMM yyyy HH:mm")}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border/40 px-4 py-2">
            <span className="text-sm text-muted-foreground">Status</span>
            <Switch
              checked={statusValue === "published"}
              onCheckedChange={(checked) =>
                form.setValue("status", checked ? "published" : "draft")
              }
            />
            <span className="text-sm font-medium">
              {statusValue === "published" ? "Published" : "Draft"}
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,420px)]">
          <Card className="border-border/30 bg-background/80">
            <CardHeader>
              <CardTitle>Informasi Konten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Judul utama artikel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="otomatis jika dikosongkan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ringkasan</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Deskripsi singkat untuk meta / kartu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <CategorySelect
                      value={field.value || undefined}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagInput
                        value={tags}
                        suggestions={TAG_SUGGESTIONS}
                        onChange={(items) => field.onChange(items.join(","))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cover_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover</FormLabel>
                    <FormControl>
                      <CoverUploader
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-background/80">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Penjadwalan</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="published_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish at (opsional)</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="text-xs text-muted-foreground">
                Kosongkan jika ingin memakai waktu ketika tombol publish
                ditekan.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border-border/30 bg-background/80">
            <CardHeader>
              <CardTitle>MDX Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="min-h-[400px] font-mono"
                        placeholder={`## Mulai menulis\n\n> MDX mendukung komponen, markdown, dan lainnya.`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="border-primary/40 bg-linear-to-b from-background to-primary/5">
            <CardHeader>
              <div>
                <CardTitle>Preview Realtime</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Render instan untuk melihat tampilan MDX sebelum publish.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={contentValue}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <MdxLivePreview value={contentValue ?? ""} />
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
