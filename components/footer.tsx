"use client";

import Link from "next/link";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const currentYear = new Date().getFullYear();

const footerLinks = {
  Navigasi: [
    { name: "Home", href: "/" },
    { name: "Semua Artikel", href: "/posts" },
    { name: "About", href: "https://mubarrok.my.id" },
    { name: "Dashboard", href: "/dashboard" },
  ],
  Kategori: [
    { name: "Teknologi", href: "/categories/teknologi" },
    { name: "Tutorial", href: "/categories/tutorial" },
    { name: "Berita", href: "/categories/berita" },
  ],
  Lainnya: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "RSS Feed", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/Husni07",
    ariaLabel: "GitHub",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/hsnmbrr",
    ariaLabel: "Twitter",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/mubarrok",
    ariaLabel: "LinkedIn",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/hsnmbrr",
    ariaLabel: "Instagram",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:mubarrok@example.com",
    ariaLabel: "Email",
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background via-background/95 to-background/80 backdrop-blur">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-2xl border border-border/40 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                Dapatkan artikel terbaru
              </h3>
              <p className="text-sm text-muted-foreground">
                Subscribe untuk mendapatkan notifikasi artikel baru langsung ke
                inbox Anda
              </p>
            </div>
            <button className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Separator className="mb-12 bg-border/30" />

        {/* Footer Content Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-xl font-bold text-transparent">
                Mubarrok
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tech blog tentang AI, Web Development, dan tren teknologi
                terkini
              </p>
            </div>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background/40 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-semibold text-foreground">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8 bg-border/30" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            <p>
              &copy; {currentYear} Mubarrok Tech Blog. All rights reserved. |
              Built with <span className="text-primary">Next.js</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 text-sm">
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
