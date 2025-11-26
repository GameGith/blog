import { requireAdmin } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SettingsPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Kelola pengaturan aplikasi Anda</p>
      </div>
      <Card className="border-border/30 bg-background/80">
        <CardHeader>
          <CardTitle>Pengaturan Umum</CardTitle>
          <CardDescription>
            Fitur pengaturan akan segera tersedia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Halaman ini sedang dalam pengembangan. Anda dapat menambahkan
            pengaturan seperti notifikasi, tema, dan preferensi lainnya di sini.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
