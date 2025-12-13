"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, User, LogIn, Search, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { UserNavButton } from "./user-nav-button";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Posts", href: "/posts", icon: BookOpen },
  { name: "About", href: "https://mubarrok.my.id", icon: User },
];

type NavbarProps = {
  session?: any;
  profile?: any;
};

export function Navbar({ session, profile }: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar - Dynamic Island Style */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{
            width: isScrolled ? "auto" : "auto",
            padding: isScrolled ? "0.75rem 1.5rem" : "0.875rem 1.75rem",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative overflow-hidden rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl dark:border-white/5 dark:bg-white/5"
          style={{
            boxShadow:
              "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-white/5 via-white/10 to-white/5" />

          <div className="relative flex items-center gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 transition-transform hover:scale-105"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                <Image
                  src="/icon.png"
                  alt="Mubarrok Tech Logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <motion.span
                animate={{
                  opacity: isScrolled ? 0 : 1,
                  width: isScrolled ? 0 : "auto",
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden whitespace-nowrap bg-linear-to-r from-teal-400 to-emerald-400 bg-clip-text text-sm font-semibold text-transparent"
              >
                Mubarrok
              </motion.span>
            </Link>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-linear-to-b from-transparent via-white/20 to-transparent" />

            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveItem(item.href)}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-4 py-2"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full bg-linear-to-r from-teal-500/20 to-emerald-500/20"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <div className="relative flex items-center gap-2">
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            isActive
                              ? "text-teal-400"
                              : "text-gray-400 hover:text-white"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-linear-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"
                              : "text-gray-300 hover:text-white"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-linear-to-b from-transparent via-white/20 to-transparent" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.toggleCommandMenu?.()}
                className="group flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                title="Cari (Ctrl+K)"
              >
                <Search className="h-4 w-4" />
                <span className="hidden text-xs text-gray-500 group-hover:text-gray-300 lg:inline-block">
                  <kbd className="font-sans">Ctrl K</kbd>
                </span>
              </motion.button>

              <ThemeToggle />

              {session ? (
                <UserNavButton
                  session={session}
                  displayName={profile?.display_name}
                  email={profile?.email}
                  avatarUrl={profile?.avatar_url}
                />
              ) : (
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-white/5 p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    title="Masuk ke Dashboard"
                  >
                    <LogIn className="h-4 w-4" />
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-50 md:hidden"
      >
        <div className="mx-4 mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl dark:border-white/5 dark:bg-white/5">
          <div className="flex items-center justify-between p-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                <Image
                  src="/icon.png"
                  alt="Mubarrok Tech Logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <span className="bg-linear-to-r from-teal-400 to-emerald-400 bg-clip-text text-sm font-semibold text-transparent">
                Mubarrok
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => window.toggleCommandMenu?.()}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Search className="h-5 w-5" />
              </motion.button>
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-t border-white/10"
              >
                <div className="space-y-1 p-4">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.href;

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => {
                            setActiveItem(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                            isActive
                              ? "bg-linear-to-r from-teal-500/20 to-emerald-500/20"
                              : "hover:bg-white/5"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              isActive ? "text-teal-400" : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              isActive
                                ? "bg-linear-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"
                                : "text-gray-300"
                            }`}
                          >
                            {item.name}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Login Button */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:bg-white/5"
                    >
                      <LogIn className="h-5 w-5 text-gray-400" />
                      <span className="font-medium">Login</span>
                    </Link>
                  </motion.div>
                  {/* Search Button (Mobile) */}
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 + 0.1 }}
  
                    onClick={() => {
                      window.toggleCommandMenu?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:bg-white/5"
                  >
                    <Search className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">Search</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-20 md:h-24" />
    </>
  );
}
