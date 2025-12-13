import { Metadata } from "next";
import { redirect } from "next/navigation";

import { requireSession, getCurrentProfile, getSession } from "@/lib/auth";
import { ProfileForm } from "@/components/dashboard/profile-form";

export const metadata: Metadata = {
  title: "Profil Saya",
};

export default async function ProfilesPage() {
  const session = await requireSession();
  const currentSession = await getSession();
  const profile = await getCurrentProfile();

  if (!currentSession) {
    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
        <p className="text-muted-foreground">Kelola informasi profil Anda</p>
      </div>
      <ProfileForm
        session={session}
        profile={profile}
        redirectToAfterSave="/"
      />
    </main>
  );
}
