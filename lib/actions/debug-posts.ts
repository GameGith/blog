import { createSupabaseServerClient } from "@/lib/supabase/server";

async function debug() {
  const supabase = await createSupabaseServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("title, excerpt, tags, content")
    .eq("status", "published");
    
  console.log(JSON.stringify(posts, null, 2));
}

debug();
