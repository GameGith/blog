import { z } from "zod";

export const postSchema = z
  .object({
    id: z.string().uuid().optional().or(z.literal("")).or(z.null()),
    title: z.string().min(1, "Judul tidak boleh kosong"),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan -")
      .min(3)
      .optional()
      .or(z.literal("")),
    excerpt: z.string().max(1000).optional().or(z.literal("")),
    content: z.string().min(1, "Konten tidak boleh kosong"),
    cover_url: z.string().url().optional().or(z.literal("")),
    tags: z.string().optional().or(z.literal("")),
    category_id: z.string().uuid().optional().or(z.literal("")).or(z.null()),
    status: z.enum(["draft", "published"]).default("draft"),
    published_at: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Validasi lebih ketat hanya untuk artikel yang akan dipublish
    if (data.status === "published") {
      if (data.title.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 4,
          type: "string",
          inclusive: true,
          origin: "string",
          path: ["title"],
          message: "Judul minimal 4 karakter untuk publikasi",
        });
      }
      if (data.content.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 10,
          type: "string",
          inclusive: true,
          origin: "string",
          path: ["content"],
          message: "Konten minimal 10 karakter untuk publikasi",
        });
      }
    }
  });

export type PostFormValues = z.infer<typeof postSchema>;
