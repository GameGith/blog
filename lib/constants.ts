export const CATEGORY_OPTIONS = [
  { label: "Teknologi", value: "teknologi" },
  { label: "Produk", value: "produk" },
  { label: "Tutorial", value: "tutorial" },
  { label: "Opini", value: "opini" },
  { label: "Berita", value: "berita" },
];

export const TAG_SUGGESTIONS = [
  "berita",
  "hot news",
  "bitcoin",
  "cryptocurrency",
  "update",
  "tips",
  "lifestyle",
  "travel",
  "trading",
];

export const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!;

export const SIGNUP_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SIGNUP === "true";
