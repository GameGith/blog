import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Pelajari lebih lanjut tentang IDCode Tech Blog, sumber informasi terpercaya untuk teknologi, AI, Web Development, dan inovasi digital terkini.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-background/80 via-primary/5 to-background/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Tentang IDCode Tech Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Platform terpercaya untuk informasi teknologi, AI, Web
              Development, dan inovasi digital masa depan
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Logo & Brand Section */}
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                IDCode Tech Blog
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                IDCode Tech Blog adalah platform terpercaya yang menyediakan
                konten berkualitas tinggi tentang perkembangan terkini di
                industri teknologi. Kami berkomitmen untuk memberikan informasi
                mendalam, tutorial praktis, dan analisis tentang AI, Web
                Development, Cloud Computing, dan inovasi digital lainnya.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Melalui artikel-artikel kami, kami membantu developer,
                entrepreneur, dan tech enthusiast untuk tetap update dengan
                teknologi terbaru dan mengimplementasikan best practices dalam
                proyek mereka.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden bg-linear-to-br from-teal-500/20 to-emerald-500/20 border border-border/50 flex items-center justify-center">
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src="/icon.png"
                  alt="IDCode Tech Blog Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Nilai Kami
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Kualitas",
                  description:
                    "Konten original, terverifikasi, dan ditulis oleh penulis berpengalaman di bidangnya",
                  icon: "✓",
                },
                {
                  title: "Kejelasan",
                  description:
                    "Menjelaskan konsep teknis dengan cara yang mudah dipahami oleh semua level",
                  icon: "💡",
                },
                {
                  title: "Konsistensi",
                  description:
                    "Update reguler dengan konten terbaru mengikuti perkembangan industri teknologi",
                  icon: "📈",
                },
                {
                  title: "Kepercayaan",
                  description:
                    "Transparan, jujur, dan tidak menyebarkan misinformasi dalam setiap artikel",
                  icon: "🤝",
                },
                {
                  title: "Inovasi",
                  description:
                    "Selalu mencari cara baru untuk menyajikan informasi dengan lebih baik",
                  icon: "🚀",
                },
                {
                  title: "Komunitas",
                  description:
                    "Membangun komunitas yang solid dan saling mendukung dalam pembelajaran teknologi",
                  icon: "👥",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-border/50 bg-card/50 p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Topics Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Topik yang Kami Bahas
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Artificial Intelligence & Machine Learning",
                "Web Development & Frontend",
                "Backend & Cloud Computing",
                "Mobile Development",
                "DevOps & Infrastructure",
                "Web3 & Blockchain",
                "Cybersecurity",
                "Data Science",
                "Product Management",
                "Software Architecture",
                "Programming Languages",
                "Tech Trends & News",
              ].map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/30 hover:border-primary/50 transition-colors"
                >
                  <span className="text-lg">📚</span>
                  <span className="font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="rounded-2xl border border-border/50 bg-linear-to-br from-teal-500/10 via-primary/5 to-emerald-500/10 p-8 sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Hubungi Kami
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg mb-4">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:husni@mubarrok.my.id"
                        className="text-primary hover:underline"
                      >
                        husni@mubarrok.my.id
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Website</p>
                      <p className="text-muted-foreground">
                        https://idcode.my.id
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Follow Kami</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Husni07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border hover:bg-primary/10 transition-colors"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/hsnmbrr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border hover:bg-primary/10 transition-colors"
                    aria-label="Twitter"
                    title="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/hsnmbrr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border hover:bg-primary/10 transition-colors"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
