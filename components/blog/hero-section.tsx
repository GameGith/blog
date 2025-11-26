"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, UserPlus } from "lucide-react";

import { SIGNUP_ENABLED } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-b from-background/80 via-primary/5 to-background/60 p-8 shadow-2xl">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
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
            <Link href="/dashboard">
              Buka dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/login">
              <Shield className="h-4 w-4" />
              Masuk admin
            </Link>
          </Button>
          {SIGNUP_ENABLED && (
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="gap-2 border border-dashed"
            >
              <Link href="/signup">
                <UserPlus className="h-4 w-4" />
                Daftar kontributor
              </Link>
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
