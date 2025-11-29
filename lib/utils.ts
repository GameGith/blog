import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(url: string | null) {
  if (!url) return null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && url.startsWith(supabaseUrl)) {
    return url.replace(
      `${supabaseUrl}/storage/v1/object/public`,
      "/cdn"
    );
  }
  return url;
}
