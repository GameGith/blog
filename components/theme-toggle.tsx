"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Toggle theme"
        disabled
      >
        <div className="relative h-5 w-5">
          <Sun className="h-5 w-5 opacity-0" />
        </div>
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="rounded-full bg-white/5 p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5">
        <motion.span
          key={theme}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.span>
      </div>
    </motion.button>
  );
}

