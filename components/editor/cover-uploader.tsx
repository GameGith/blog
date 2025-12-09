"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { STORAGE_BUCKET } from "@/lib/constants";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  value?: string;
  onChange: (url: string) => void;
};

export function CoverUploader({ value, onChange }: Props) {
  const { client, user } = useSupabase();
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const processFile = async (file: File) => {
    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Ukuran gambar maksimal 5MB");
      return;
    }

    try {
      setUploading(true);

      if (!user) {
        toast.error("Anda harus login untuk mengunggah gambar");
        return;
      }

      const fileName = `${user.id}/${Date.now()}-${file.name.replace(
        /[^a-zA-Z0-9.-]/g,
        "_"
      )}`;
      const { data, error } = await client.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Upload error:", error);
        throw new Error(error.message || "Gagal upload gambar");
      }

      const { data: publicUrl } = client.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(data.path);

      onChange(publicUrl.publicUrl);
      toast.success("Cover berhasil diunggah");
    } catch (error) {
      console.error("Cover upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal upload cover"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processFile(file);
    }
    event.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-dashed transition-colors ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border/60 bg-muted/20"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {value ? (
          <Image
            src={value}
            alt="Cover"
            fill
            sizes="100%"
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-center text-sm text-muted-foreground">
            <ImagePlus className="mb-2 h-6 w-6" />
            <p>Drag & drop atau pilih file</p>
            <p className="mt-1 text-xs">Max 5MB</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="file"
          accept="image/*"
          onChange={handleSelect}
          disabled={uploading}
        />
        <Button
          type="button"
          variant="secondary"
          disabled={!value || uploading}
          onClick={() => {
            if (!value) return;
            navigator.clipboard.writeText(value);
            toast.success("URL cover disalin");
          }}
        >
          Salin URL
        </Button>
      </div>
    </div>
  );
}
