import { notFound } from "next/navigation";

import { getPostById } from "@/lib/data/posts";
import { PostEditor } from "@/components/editor/post-editor";

type Params = {
  id: string;
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PostEditor post={post} />
    </div>
  );
}
