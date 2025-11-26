import type { Session } from "@supabase/supabase-js";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SupabaseProvider initialSession={session}>
      <ThemeProvider>
        {children}
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </SupabaseProvider>
  );
}

