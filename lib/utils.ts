import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(url: string | null) {
  if (!url) return null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && url.startsWith(supabaseUrl)) {
    return url.replace(`${supabaseUrl}/storage/v1/object/public`, "/cdn");
  }
  return url;
}

// Format date/time consistently in Indonesian locale and Asia/Jakarta timezone
export function formatIDDate(
  dateInput: string | number | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
) {
  if (!dateInput) return null;
  try {
    const date = new Date(dateInput);
    return new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      ...options,
    }).format(date);
  } catch {
    return null;
  }
}
