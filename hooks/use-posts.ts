"use client";

import useSWR from "swr";
import type { BlogPost } from "@/types/blog";

type ApiResponse<T> = {
  status: "success" | "error";
  data: T;
  message?: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch");
  }
  
  const json: ApiResponse<BlogPost[]> = await res.json();
  return json.data;
};

export function usePosts() {
  const { data, error, isLoading } = useSWR<BlogPost[]>(
    "/api/posts",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    posts: data,
    isLoading,
    isError: error,
  };
}

export function usePostBySlug(slug: string) {
  const { data, error, isLoading } = useSWR<BlogPost>(
    slug ? `/api/posts/${slug}` : null,
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch");
      }
      const json: ApiResponse<BlogPost> = await res.json();
      return json.data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    post: data,
    isLoading,
    isError: error,
  };
}

export function usePostsByCategory(slug: string) {
  const { data, error, isLoading } = useSWR<BlogPost[]>(
    slug ? `/api/categories/${slug}/posts` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    posts: data,
    isLoading,
    isError: error,
  };
}

export function usePostsByTag(tag: string) {
  const { data, error, isLoading } = useSWR<BlogPost[]>(
    tag ? `/api/tags/${tag}/posts` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    posts: data,
    isLoading,
    isError: error,
  };
}
