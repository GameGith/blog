"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, User, Laptop, Moon, Sun, Monitor, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

import { searchPosts, type SearchResult } from "@/lib/actions/search";
import { useDebounce } from "@/hooks/use-debounce";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  
  const router = useRouter();
  const { setTheme } = useTheme();
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  React.useEffect(() => {
    async function fetchPosts() {
      if (debouncedQuery.length === 0) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchPosts(debouncedQuery);
        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [debouncedQuery]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  // Expose toggle function to window so Navbar can call it
  React.useEffect(() => {
    // @ts-ignore
    window.toggleCommandMenu = () => setOpen((open) => !open);
    return () => {
      // @ts-ignore
      delete window.toggleCommandMenu;
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-xl dark:bg-black/90 animate-in fade-in zoom-in-95 duration-200">
        <Command 
          className="w-full"
          loop
          shouldFilter={false} // We filter manually via server action
        >
          <div className="flex items-center border-b border-white/10 px-4" cmdk-input-wrapper="">
            <Search className="mr-2 h-5 w-5 shrink-0 opacity-50 text-teal-400" />
            <Command.Input 
              placeholder="Cari artikel, topik, atau perintah..." 
              className="flex h-14 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={query}
              onValueChange={setQuery}
              autoFocus
            />
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {!query && (
              <>
                <Command.Group heading="Navigasi">
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-teal-500/20 aria-selected:text-teal-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/blog"))}
                    className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-teal-500/20 aria-selected:text-teal-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Blog</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/about"))}
                    className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-teal-500/20 aria-selected:text-teal-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>About</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Tema">
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme("light"))}
                    className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-teal-500/20 aria-selected:text-teal-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light Mode</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme("dark"))}
                    className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-teal-500/20 aria-selected:text-teal-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme("system"))}
                    className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-teal-500/20 aria-selected:text-teal-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>System Theme</span>
                  </Command.Item>
                </Command.Group>
              </>
            )}

            {query && results.length > 0 && (
              <Command.Group heading="Artikel">
                {results.map((post) => (
                  <Command.Item
                    key={post.id}
                    onSelect={() => runCommand(() => router.push(`/posts/${post.slug}`))}
                    className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-teal-500/20 aria-selected:text-teal-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{post.title}</span>
                      {post.category && (
                        <span className="text-xs text-muted-foreground">{post.category.name}</span>
                      )}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {query && !loading && results.length === 0 && (
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                Tidak ada hasil yang ditemukan.
              </Command.Empty>
            )}
          </Command.List>
          
          <div className="border-t border-white/10 px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
            <div className="flex gap-2">
              <span>Navigasi: <kbd className="bg-white/10 px-1 rounded">↑</kbd> <kbd className="bg-white/10 px-1 rounded">↓</kbd></span>
              <span>Pilih: <kbd className="bg-white/10 px-1 rounded">Enter</kbd></span>
            </div>
            <span>Tutup: <kbd className="bg-white/10 px-1 rounded">Esc</kbd></span>
          </div>
        </Command>
      </div>
    </div>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
