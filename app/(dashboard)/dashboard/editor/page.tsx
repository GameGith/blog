import { Metadata } from "next";
import { PostEditor } from "@/components/editor/post-editor";

export const metadata: Metadata = {
  title: "Editor Artikel",
};

export default function CreatePostPage() {
  return (
    <div className="space-y-8">
      <PostEditor />
    </div>
  );
}

