"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  const topics = [
    "Crypto & Blockchain",
    "AI & Machine Learning",
    "Web3 & DeFi",
    "Digital Economy",
    "NFT & Metaverse",
    "Cloud Computing",
  ];

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopicIndex((prev) => (prev + 1) % topics.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [topics.length]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-b from-background/80 via-primary/5 to-background/60 p-8 shadow-2xl">
      <div className="max-w-3xl space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm uppercase tracking-[0.3em] text-primary"
        >
          AI • ML • Web3 • Digital Economy • Cryptocurrency
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Berita & Analisis Terkini:{" "}
          <span className="inline-block min-w-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTopicIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-gradient-to-r from-primary via-accent to-primary/80 bg-clip-text text-transparent animate-gradient"
              >
                {topics[currentTopicIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg leading-relaxed text-muted-foreground"
        >
          Sumber berita terpercaya untuk informasi terkini seputar{" "}
          <strong className="font-semibold text-foreground">
            Cryptocurrency
          </strong>
          ,{" "}
          <strong className="font-semibold text-foreground">Blockchain</strong>,{" "}
          <strong className="font-semibold text-foreground">Web3</strong>,{" "}
          <strong className="font-semibold text-foreground">AI</strong>, dan{" "}
          <strong className="font-semibold text-foreground">
            Digital Economy
          </strong>
          . Dapatkan analisis mendalam, update pasar, dan insight dari para ahli
          industri.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap gap-3"
        >
          <Button asChild size="lg" className="gap-2 shadow-lg">
            <Link href="/posts">
              <BookOpen className="h-4 w-4" />
              Baca Berita Terkini
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/profiles">
              <Mail className="h-4 w-4" />
              Subscribe Newsletter
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
