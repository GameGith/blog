export type PostStatus = "draft" | "published";

export type Profile = {
  id: string;
  display_name: string | null;
  email: string | null;
  role: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  tags: string[];
  category_id: string | null;
  category?: Category | null;
  status: PostStatus;
  views: number;
  likes: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string | null;
  author?: Profile | null;
};

export type DashboardStats = {
  totalPosts: number;
  drafts: number;
  published: number;
  lastUpdated?: string | null;
};
