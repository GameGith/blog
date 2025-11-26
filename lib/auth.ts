import { cache } from "react";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getSession = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
});

export const requireSession = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return session;
};

export const getCurrentProfile = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return data ?? null;
});

export const requireAdmin = async () => {
  const session = await requireSession();
  const profile = await getCurrentProfile();
  const role = profile?.role ?? session.user.app_metadata?.role;

  if (role !== "admin") {
    redirect("/");
  }

  return session;
};

