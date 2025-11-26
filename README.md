## ✨ Blog SSG MDX + Supabase

Fitur utama:

- SSG (ISR 60 detik) untuk homepage & detail artikel (`/` & `/posts/[slug]`)
- Editor MDX dengan preview realtime (menggunakan `@mdx-js/mdx`)
- Draft & publish workflow lengkap, jadwal `published_at`
- Upload cover langsung ke Supabase Storage bucket
- Tags & kategori dengan filter interaktif
- Admin dashboard + statistik + tabel manajemen konten
- Auth Supabase (email/password) + proteksi layout dashboard
- Tabel `profiles` untuk identitas penulis + relasi ke artikel
- Halaman signup opsional (dikendalikan lewat ENV) untuk perekrutan kontributor
- Integrasi Shadcn UI + framer-motion untuk UI yang halus

## 🚀 Menjalankan lokal

```bash
npm install
npm run dev
# buka http://localhost:3000
```

## 🔐 Environment

Buat file `.env.local` (contoh):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
NEXT_PUBLIC_SUPABASE_BUCKET=blog-media
NEXT_PUBLIC_ENABLE_SIGNUP=false
```

> Pastikan bucket `blog-media` sudah dibuat di Supabase Storage dan public.

## 🗄️ Skema database

Gunakan `supabase/schema.sql` untuk membuat tabel `profiles`, `posts`, trigger `updated_at`, dan kebijakan RLS. Kebijakan default:

- publik hanya bisa `select` artikel `status = 'published'`
- user authenticated bisa CRUD (atur lagi sesuai kebutuhan, mis. hanya `role = 'admin'`)
- tabel `profiles` bisa dibaca publik, tapi hanya pemilik akun yang boleh insert/update barisnya sendiri

> Jika sudah pernah membuat tabel `posts` sebelumnya, jalankan ulang skrip untuk memastikan foreign key `author_id` sekarang menunjuk ke `public.profiles`.

## 📦 Struktur penting

- `app/page.tsx` — landing + list blog (SSG)
- `app/posts/[slug]/page.tsx` — halaman detail MDX (SSG)
- `app/(dashboard)/dashboard/*` — dashboard admin (proteksi Supabase auth)
- `app/login` — form login
- `components/editor/*` — editor MDX, live preview, uploader
- `lib/data/posts.ts` — query & helper Supabase
- `lib/mdx.tsx` — renderer MDX untuk server component

## ✅ Workflow konten

1. Login via `/login`
2. Buka `/dashboard/editor` untuk buat draft
3. Tulis MDX, cek preview realtime, upload cover
4. Simpan sebagai draft atau langsung publish
5. Halaman publik otomatis revalidate setiap 60 detik

## 🧰 Tools

- Next.js 16 App Router + Server Actions
- Supabase (`@supabase/ssr`) untuk auth, database, storage
- Shadcn UI (tailwind v4 siap pakai)
- Framer Motion untuk animasi
- Zod + React Hook Form untuk validasi editor
- Toggle signup lewat `NEXT_PUBLIC_ENABLE_SIGNUP` (true untuk menampilkan halaman `/signup`)

Selamat ngoprek ✌️
