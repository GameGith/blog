"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
};

export function TagInput({
  value,
  onChange,
  suggestions = [],
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const addTag = (tag: string) => {
    if (!tag.trim()) return;
    const normalized = tag.trim().toLowerCase();
    if (value.includes(normalized)) return;
    onChange([...value, normalized]);
    setDraft("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((item) => item !== tag));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Tambahkan tag lalu tekan Enter"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag(draft);
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={() => addTag(draft)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      {!!suggestions.length && (
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {suggestions.map((tag) => (
            <button
              type="button"
              key={tag}
              className="rounded-full border border-dashed border-border px-3 py-1 transition hover:border-primary hover:text-primary"
              onClick={() => addTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

