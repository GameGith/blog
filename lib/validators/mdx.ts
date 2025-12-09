import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export async function validateMdx(content: string) {
  try {
    // Coba compile MDX untuk mendeteksi syntax error
    await compile(content, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
      outputFormat: "function-body",
    });
    return { valid: true, error: null };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid MDX syntax",
    };
  }
}
