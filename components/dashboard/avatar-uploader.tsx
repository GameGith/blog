"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Loader2, User } from "lucide-react";
import { toast } from "sonner";

import { STORAGE_BUCKET } from "@/lib/constants";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  userId: string;
};

export function AvatarUploader({ value, onChange, userId }: Props) {
  const { client } = useSupabase();
  const [uploading, setUploading] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB untuk avatar

  const handleSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      event.target.value = "";
      return;
    }

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Ukuran gambar maksimal 2MB");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);

      // Delete old avatar if exists
      if (value) {
        try {
          const oldPath = value.split(`${STORAGE_BUCKET}/`)[1];
          if (oldPath && oldPath.startsWith("avatar/")) {
            await client.storage.from(STORAGE_BUCKET).remove([oldPath]);
          }
        } catch (err) {
          console.warn("Failed to delete old avatar:", err);
        }
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `avatar/${userId}.${fileExt}`;

      const { data, error } = await client.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Upload error:", error);
        throw new Error(error.message || "Gagal upload avatar");
      }

      const { data: publicUrl } = client.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(data.path);

      onChange(publicUrl.publicUrl);
      toast.success("Avatar berhasil diunggah");
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal upload avatar"
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-border/40 bg-muted/20">
        {value ? (
          <Image src={value} alt="Avatar" fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => document.getElementById("avatar-upload")?.click()}
          >
            {uploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Camera className="mr-2 h-4 w-4" />
            )}
            {value ? "Ganti Avatar" : "Upload Avatar"}
          </Button>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange("")}
            >
              Hapus
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          JPG, PNG atau GIF. Max 2MB.
        </p>
        <Input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleSelect}
          disabled={uploading}
          className="hidden"
        />
      </div>
    </div>
  );
}
