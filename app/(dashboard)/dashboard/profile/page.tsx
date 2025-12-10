import { Metadata } from "next";
import { redirect } from "next/navigation";

import { requireAdmin, getCurrentProfile, getSession } from "@/lib/auth";
import { ProfileForm } from "@/components/dashboard/profile-form";

export const metadata: Metadata = {
  title: "Profil Saya",
};

export default async function ProfilePage() {
  await requireAdmin();
  const session = await getSession();
  const profile = await getCurrentProfile();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Kelola informasi profile Anda</p>
      </div>
      <ProfileForm session={session} profile={profile} />
    </div>
  );
}
