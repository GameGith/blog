"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, User, Loader2, FolderOpen, Hash, X } from "lucide-react";

import { searchPosts, searchCategories, searchTags, type SearchResult, type CategoryResult, type TagResult } from "@/lib/actions/search";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

type CommandItemType = 
  | { type: 'nav'; label: string; icon: React.ReactNode; action: () => void }
  | { type: 'post'; data: SearchResult; action: () => void }
  | { type: 'category'; data: CategoryResult; action: () => void }
  | { type: 'tag'; data: TagResult; action: () => void };

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [categories, setCategories] = React.useState<CategoryResult[]>([]);
  const [tags, setTags] = React.useState<TagResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

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
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setResults([]);
      setCategories([]);
      setTags([]);
    }
  }, [open]);

  React.useEffect(() => {
    async function fetchResults() {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setCategories([]);
        setTags([]);
        return;
      }

      setLoading(true);
      try {
        const [postsData, categoriesData, tagsData] = await Promise.all([
          searchPosts(debouncedQuery),
          searchCategories(debouncedQuery),
          searchTags(debouncedQuery),
        ]);
        setResults(postsData);
        setCategories(categoriesData);
        setTags(tagsData);
        setSelectedIndex(0); // Reset selection on new results
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
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

  // Construct the flat list of items for navigation
  const items: CommandItemType[] = React.useMemo(() => {
    const list: CommandItemType[] = [];
    
    if (!query) {
      list.push(
        { type: 'nav', label: 'Home', icon: <HomeIcon className="mr-2 h-4 w-4" />, action: () => router.push("/") },
        { type: 'nav', label: 'Semua Artikel', icon: <FileText className="mr-2 h-4 w-4" />, action: () => router.push("/posts") },
        { type: 'nav', label: 'About', icon: <User className="mr-2 h-4 w-4" />, action: () => router.push("/about") }
      );
    } else {
      results.forEach(post => list.push({ type: 'post', data: post, action: () => router.push(`/posts/${post.slug}`) }));
      categories.forEach(cat => list.push({ type: 'category', data: cat, action: () => router.push(`/categories/${cat.slug}`) }));
      tags.forEach(tag => list.push({ type: 'tag', data: tag, action: () => router.push(`/tags/${tag.tag}`) }));
    }
    
    return list;
  }, [query, results, categories, tags, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % items.length);
      // Scroll into view logic could be added here
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items[selectedIndex]) {
        runCommand(items[selectedIndex].action);
      }
    }
  };

  // Scroll active item into view
  React.useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector('[data-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!open) return null;

  const hasResults = results.length > 0 || categories.length > 0 || tags.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-xl dark:bg-black/90 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header / Input */}
        <div className="flex items-center border-b border-white/10 px-4 py-3">
          <Search className="mr-2 h-5 w-5 shrink-0 opacity-50 text-teal-400" />
          <input 
            ref={inputRef}
            placeholder="Cari artikel, kategori, atau tag..." 
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {loading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <button onClick={() => setOpen(false)} className="ml-2 text-muted-foreground hover:text-white">
              <kbd className="hidden sm:inline-block bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono">ESC</kbd>
              <X className="sm:hidden h-4 w-4" />
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']" ref={listRef}>
          {!query && (
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Navigasi</div>
              {items.map((item, index) => (
                <div
                  key={index}
                  data-selected={selectedIndex === index}
                  onClick={() => runCommand(item.action)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none transition-colors",
                    selectedIndex === index ? "bg-teal-500/20 text-teal-400" : "text-white hover:bg-teal-500/10"
                  )}
                >
                  {item.type === 'nav' && item.icon}
                  <span>{item.type === 'nav' && item.label}</span>
                </div>
              ))}
            </div>
          )}

          {query && (
            <>
              {!hasResults && !loading && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Tidak ada hasil yang ditemukan.
                </div>
              )}

              {/* We need to render the groups but map them to the flat 'items' index */}
              {results.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Artikel</div>
                  {results.map((post, i) => {
                    // Calculate global index: 0 + i
                    const globalIndex = i; 
                    return (
                      <div
                        key={post.id}
                        data-selected={selectedIndex === globalIndex}
                        onClick={() => runCommand(() => router.push(`/posts/${post.slug}`))}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          "flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none transition-colors",
                          selectedIndex === globalIndex ? "bg-teal-500/20 text-teal-400" : "text-white hover:bg-teal-500/10"
                        )}
                      >
                        <FileText className="mr-2 h-4 w-4 shrink-0" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="truncate">{post.title}</span>
                          {post.category && (
                            <span className="text-xs text-muted-foreground truncate">{post.category.name}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {categories.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Kategori</div>
                  {categories.map((category, i) => {
                    // Calculate global index: results.length + i
                    const globalIndex = results.length + i;
                    return (
                      <div
                        key={category.id}
                        data-selected={selectedIndex === globalIndex}
                        onClick={() => runCommand(() => router.push(`/categories/${category.slug}`))}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          "flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none transition-colors",
                          selectedIndex === globalIndex ? "bg-teal-500/20 text-teal-400" : "text-white hover:bg-teal-500/10"
                        )}
                      >
                        <FolderOpen className="mr-2 h-4 w-4 shrink-0" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="truncate">{category.name}</span>
                          {category.description && (
                            <span className="text-xs text-muted-foreground truncate">{category.description}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {tags.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Tag</div>
                  {tags.map((tagItem, i) => {
                    // Calculate global index: results.length + categories.length + i
                    const globalIndex = results.length + categories.length + i;
                    return (
                      <div
                        key={tagItem.tag}
                        data-selected={selectedIndex === globalIndex}
                        onClick={() => runCommand(() => router.push(`/tags/${tagItem.tag}`))}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          "flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none transition-colors",
                          selectedIndex === globalIndex ? "bg-teal-500/20 text-teal-400" : "text-white hover:bg-teal-500/10"
                        )}
                      >
                        <Hash className="mr-2 h-4 w-4 shrink-0" />
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="truncate">#{tagItem.tag}</span>
                          <span className="text-xs text-muted-foreground shrink-0">({tagItem.count} artikel)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="border-t border-white/10 px-4 py-2 text-xs text-muted-foreground flex items-center justify-between bg-white/5">
          <div className="flex gap-2">
            <span>Navigasi: <kbd className="bg-white/10 px-1 rounded font-mono">↑</kbd> <kbd className="bg-white/10 px-1 rounded font-mono">↓</kbd></span>
            <span>Pilih: <kbd className="bg-white/10 px-1 rounded font-mono">Enter</kbd></span>
          </div>
        </div>
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
