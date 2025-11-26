import { NextResponse } from "next/server";
import type { Session } from "@supabase/supabase-js";

import { createSupabaseServerClient } from "@/lib/supabase/server";

type Payload = {
  event: string;
  session: Session | null;
};

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { event, session }: Payload = await request.json();

  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    if (session) {
      await supabase.auth.setSession(session);
    }
  }

  if (event === "SIGNED_OUT") {
    await supabase.auth.signOut();
  }

  return NextResponse.json({ success: true });
}

