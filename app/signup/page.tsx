import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { UserPlus } from "lucide-react";

import { getSession } from "@/lib/auth";
import { SIGNUP_ENABLED } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Daftar Akun",
};

export default async function SignupPage() {
  if (!SIGNUP_ENABLED) {
    notFound();
  }

  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-background to-background/70 px-4 py-10">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md border-border/40 shadow-2xl backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserPlus className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Buat akun baru</CardTitle>
          <p className="text-sm text-muted-foreground">
            Daftar untuk mulai menulis draft, mengunggah cover, dan manajemen
            konten blog.
          </p>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
