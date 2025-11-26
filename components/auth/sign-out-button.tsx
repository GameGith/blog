"use client";

import { useTransition } from "react";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSupabase } from "@/components/providers/supabase-provider";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const { client } = useSupabase();
  const [pending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const { error } = await client.auth.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Sampai jumpa lagi");
      router.push("/");
      router.refresh();
    });
  };

  return (
    <Button variant="outline" onClick={handleSignOut} disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Keluar
    </Button>
  );
}

