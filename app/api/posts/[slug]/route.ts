import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPostBySlug } from "@/lib/data/posts";
import { getImageUrl } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

type Params = {
  slug: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1";
  
  const res = new NextResponse();

  try {
    // 20 requests per minute per IP for details
    await limiter.check(res, 20, ip);
  } catch {
    return NextResponse.json(
      { status: "error", message: "Rate limit exceeded" },
      { status: 429, headers: res.headers }
    );
  }

  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { status: "error", message: "Post not found" },
        { status: 404, headers: res.headers }
      );
    }

    const responseData = {
      ...post,
      cover_url: getImageUrl(post.cover_url),
      author: post.author
        ? {
            ...post.author,
            avatar_url: getImageUrl(post.author.avatar_url),
          }
        : null,
    };

    return NextResponse.json({
      status: "success",
      data: responseData,
    }, { headers: res.headers });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch post" },
      { status: 500, headers: res.headers }
    );
  }
}
