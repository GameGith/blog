"use client";

import { useEffect, useState, type ComponentType } from "react";
import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { motion } from "framer-motion";

import { Skeleton } from "@/components/ui/skeleton";
import { mdxComponents } from "@/components/mdx-components";

export function MdxLivePreview({ value }: { value: string }) {
  const [Content, setContent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!value) {
      setContent(null);
      setError(null);
      return;
    }

    async function compileMdx() {
      try {
        setLoading(true);
        const mod = await evaluate(value, {
          ...runtime,
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        });

        if (!cancelled) {
          setContent(() => mod.default as React.ComponentType);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "MDX error");
          setContent(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    compileMdx();

    return () => {
      cancelled = true;
    };
  }, [value]);

  if (loading && !Content) {
    return <Skeleton className="h-48 w-full rounded-xl" />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (!Content) {
    return (
      <div className="text-sm text-muted-foreground">
        Ketik konten MDX untuk melihat preview realtime.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="prose prose-neutral dark:prose-invert max-w-none"
    >
      <MDXProvider components={mdxComponents}>
        <Content />
      </MDXProvider>
    </motion.div>
  );
}
