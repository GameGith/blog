import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getPublishedPosts } from "@/lib/data/posts";
import { getImageUrl } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function GET() {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1";
  
  const res = new NextResponse();

  try {
    // 10 requests per minute per IP
    await limiter.check(res, 10, ip);
  } catch {
    return NextResponse.json(
      { status: "error", message: "Rate limit exceeded" },
      { status: 429, headers: res.headers }
    );
  }

  try {
    const posts = await getPublishedPosts();

    const responseData = posts.map((post) => ({
      ...post,
      cover_url: getImageUrl(post.cover_url),
      author: post.author
        ? {
            ...post.author,
            avatar_url: getImageUrl(post.author.avatar_url),
          }
        : null,
    }));

    return NextResponse.json({
      status: "success",
      data: responseData,
    }, { headers: res.headers });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch posts" },
      { status: 500, headers: res.headers }
    );
  }
}
