"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import type { Session } from "@supabase/supabase-js";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarUploader } from "@/components/dashboard/avatar-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  display_name: z.string().min(2, "Nama minimal 2 karakter"),
  bio: z
    .string()
    .max(500, "Bio maksimal 500 karakter")
    .optional()
    .or(z.literal("")),
  avatar_url: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type Props = {
  session: Session;
  profile: {
    display_name?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
  } | null;
};

export function ProfileForm({ session, profile }: Props) {
  const router = useRouter();
  const { client } = useSupabase();
  const [pending, startTransition] = useTransition();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name:
        profile?.display_name ??
        session.user.user_metadata?.display_name ??
        session.user.email?.split("@")[0] ??
        "",
      bio: profile?.bio ?? "",
      avatar_url: profile?.avatar_url ?? "",
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    startTransition(async () => {
      try {
        const { error } = await client.from("profiles").upsert(
          {
            id: session.user.id,
            email: session.user.email,
            display_name: values.display_name,
            bio: values.bio || null,
            avatar_url: values.avatar_url || null,
          },
          { onConflict: "id" }
        );

        if (error) {
          throw error;
        }

        toast.success("Profile berhasil diperbarui");
        router.refresh();
      } catch (error) {
        console.error("Profile update error:", error);
        toast.error(
          error instanceof Error ? error.message : "Gagal memperbarui profile"
        );
      }
    });
  };

  return (
    <Card className="border-border/30 bg-background/80">
      <CardHeader>
        <CardTitle>Informasi Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="avatar_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <AvatarUploader
                      value={field.value}
                      onChange={field.onChange}
                      userId={session.user.id}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Tampilan</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Ceritakan tentang diri Anda..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={pending}>
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Perubahan
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                Batal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
