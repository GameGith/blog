"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User, LayoutDashboard, FileEdit } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import { useSupabase } from "@/components/providers/supabase-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  session: Session;
  displayName?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
};

export function UserNavButton({ session, displayName, email, avatarUrl }: Props) {
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

  const userEmail = email ?? session.user.email ?? "User";
  const userName =
    displayName ??
    session.user.user_metadata?.display_name ??
    userEmail.split("@")[0];

  // Generate initials from name or email
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word: string) => word[0]?.toUpperCase())
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-full bg-white/5 p-0 transition-colors hover:bg-white/10"
        >
          {avatarUrl ? (
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white/10 hover:ring-teal-400/50 transition-all">
              <Image
                src={avatarUrl}
                alt={userName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 text-xs font-semibold text-teal-400 ring-2 ring-white/10 hover:ring-teal-400/50 transition-all">
              {initials || "U"}
            </div>
          )}
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/editor")}
          className="cursor-pointer"
        >
          <FileEdit className="mr-2 h-4 w-4" />
          <span>Tulis Baru</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/settings")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={pending}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
