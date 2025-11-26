"use client";

import { useState } from "react";
import {
  Share2,
  Link2,
  MessageCircle as WhatsApp,
  Facebook,
} from "lucide-react";
import { toast } from "sonner";

type ShareButtonsProps = {
  url: string;
  title: string;
  description?: string;
};

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link berhasil disalin!");
      setIsOpen(false);
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  const handleWhatsAppShare = () => {
    const text = `${title}${description ? ` - ${description}` : ""}\n\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(
      facebookUrl,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
    setIsOpen(false);
  };

  const handleTwitterShare = () => {
    const text = `${title}${description ? ` - ${description}` : ""}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(
      twitterUrl,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-x-2 text-sm text-muted-foreground hover:text-foreground transition"
        title="Share"
      >
        <Share2 className="size-4" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 bg-background border border-border shadow-lg rounded-xl p-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-accent w-full text-left transition"
          >
            <Link2 className="size-4" />
            Copy link
          </button>
          <div className="border-t border-border my-2"></div>
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-accent w-full text-left transition"
          >
            <WhatsApp className="size-4" />
            Share via WhatsApp
          </button>
          <button
            onClick={handleFacebookShare}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-accent w-full text-left transition"
          >
            <Facebook className="size-4" />
            Share on Facebook
          </button>
          <button
            onClick={handleTwitterShare}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-accent w-full text-left transition"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </button>
        </div>
      )}
    </div>
  );
}
