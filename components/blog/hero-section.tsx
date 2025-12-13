"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-linear-to-b from-background/80 via-primary/5 to-background/60 p-8 shadow-2xl">
      <div className="max-w-3xl space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm uppercase tracking-[0.3em] text-primary"
        >
          AI • Machine Learning • Web Development
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Jelajahi Dunia Teknologi Terkini: AI, Cloud, dan Inovasi Digital
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-muted-foreground"
        >
          Tutorial mendalam, insight terbaru, dan review komprehensif tentang
          Artificial Intelligence, Machine Learning, Web Development modern,
          Cloud Computing, dan tren teknologi masa depan. Untuk developer, tech
          enthusiast, dan siapa saja yang ingin update dengan perkembangan tech.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap gap-3"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/posts">
              <BookOpen className="h-4 w-4" />
              Jelajahi Artikel
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/posts">
              <Search className="h-4 w-4" />
              Cari Topik
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
