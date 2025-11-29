import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      throw error;
    }

    return NextResponse.json({
      status: "success",
      data: data,
    }, { headers: res.headers });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch categories" },
      { status: 500, headers: res.headers }
    );
  }
}
