"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
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
  const router = useRouter();
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

        // Redirect to dashboard if it's a new post
        if (result.isNewPost) {
          router.push("/dashboard");
        } else {
          // Update form with saved post ID
          form.reset({
            ...validated,
            id: result.post.id,
          });
        }
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
        <div className="flex flex-col gap-4 rounded-3xl border border-border/40 bg-card/60 p-6 shadow-lg lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {post ? "Edit artikel" : "Buat artikel baru"}
              </p>
              {post?.status && (
                <Badge
                  variant={
                    post.status === "published" ? "default" : "secondary"
                  }
                >
                  {post.status === "published" ? "Published" : "Draft"}
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Studio Penulisan
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {lastSaved && (
              <span className="mr-2 text-xs text-muted-foreground">
                Disimpan {format(lastSaved, "HH:mm")}
              </span>
            )}
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
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <Card className="border-border/30 bg-background/80">
              <CardHeader>
                <CardTitle>Detail Konten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Artikel</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Judul menarik..."
                          className="text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="otomatis-jika-kosong"
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
                </div>
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ringkasan Singkat</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={2}
                          placeholder="Deskripsi untuk SEO dan kartu artikel..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/30 bg-background/80">
              <CardHeader>
                <CardTitle>Pengaturan Publikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="published_at"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jadwal Publish</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <p className="text-[0.8rem] text-muted-foreground">
                        Biarkan kosong untuk publish sekarang.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cover_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
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
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/30 bg-background/80">
            <CardHeader>
              <CardTitle>Editor MDX</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="min-h-[500px] resize-y border-0 focus-visible:ring-0 font-mono p-4"
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
              <div className="flex items-center justify-between">
                <CardTitle>Preview Realtime</CardTitle>
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="h-3 w-3" /> Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
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
