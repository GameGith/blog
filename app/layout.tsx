import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getSession, getCurrentProfile } from "@/lib/auth";
import { AppProviders } from "@/components/providers/app-providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: "Mubarrok Tech Blog | AI, Web Dev & Tech Terkini",
    template: "%s | Mubarrok Tech Blog",
  },
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
  creator: "Mubarrok",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_SITE_URL!,
    title: "Mubarrok Tech Blog - AI, Web Dev & Teknologi Terkini",
    description:
      "Blog teknologi tentang AI, Machine Learning, Web Development, dan tren tech terbaru. Tutorial dan insight untuk developer.",
    siteName: "Mubarrok Tech Blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mubarrok Tech Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubarrok Tech Blog - AI & Tech Terkini",
    description:
      "Jelajahi AI, Machine Learning, Web Development, dan teknologi masa depan",
    creator: "@hsnmbrr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const profile = session ? await getCurrentProfile() : null;

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7845294761182815"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col bg-background text-foreground antialiased`}
      >
        <AppProviders session={session}>
          <Navbar session={session} profile={profile} />
          <CommandMenu />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
