import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getSession } from "@/lib/auth";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mubarrok Tech Blog | AI, Web Dev & Tech Terkini",
  description:
    "Jelajahi dunia teknologi terbaru: AI, Machine Learning, Web Development, Cloud Computing, dan tren tech masa depan. Tutorial, insight, dan review mendalam untuk developer & tech enthusiast.",
  keywords: [
    "AI",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Next.js",
    "React",
    "Cloud Computing",
    "Tech News",
    "Programming",
    "Developer",
    "Supabase",
    "MDX",
  ],
  authors: [{ name: "Mubarrok", url: "https://instagram.com/hsnmbrr" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Mubarrok Tech Blog - AI, Web Dev & Teknologi Terkini",
    description:
      "Blog teknologi tentang AI, Machine Learning, Web Development, dan tren tech terbaru. Tutorial dan insight untuk developer.",
    siteName: "Mubarrok Tech Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubarrok Tech Blog - AI & Tech Terkini",
    description:
      "Jelajahi AI, Machine Learning, Web Development, dan teknologi masa depan",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <AppProviders session={session}>{children}</AppProviders>
      </body>
    </html>
  );
}
