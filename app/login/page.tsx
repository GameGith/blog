import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { getSession } from "@/lib/auth";
import { SIGNUP_ENABLED } from "@/lib/constants";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Masuk Dashboard",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-background to-background/70 px-4 py-10">
      <Card className="w-full max-w-md border-border/40 shadow-2xl backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Dashboard Admin</CardTitle>
          <p className="text-sm text-muted-foreground">
            Masuk untuk mengelola konten, draft, dan publikasi blog.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
          {SIGNUP_ENABLED && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Belum punya akun?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Daftar di sini
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
