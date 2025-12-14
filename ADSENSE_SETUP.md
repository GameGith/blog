# Google AdSense Setup Guide untuk Mubarrok Tech Blog

## Status Approval

Saat ini blog Anda masih dalam tahap review. Berikut adalah langkah-langkah untuk meningkatkan peluang approval:

## 1. Persyaratan yang Sudah Anda Penuhi ✅

- [x] Domain yang jelas dan profesional (mubarrok.my.id)
- [x] Konten original dan berkualitas
- [x] Meta tags yang lengkap
- [x] Mobile responsive design
- [x] Navbar dan footer yang lengkap
- [x] Schema markup (untuk SEO)
- [x] AdSense script sudah ditambahkan

## 2. Checklist untuk Meningkatkan Approval Rate

### Konten & SEO

- [x] Minimal 20 artikel berkualitas tinggi
- [ ] Artikel minimal 1500 kata per post (tingkatkan jika masih kurang)
- [ ] Konten original, bukan copy-paste
- [x] Keyword research yang baik
- [ ] Internal linking yang natural

### Metadata & Technical

- [x] Sitemap.xml (sudah dibuat)
- [x] Robots.txt (sudah dibuat)
- [x] Metadata lengkap
- [ ] **PENTING: Google Search Console verification** (tambahkan verification code)
- [ ] **PENTING: Google Analytics 4** (setup tracking)

### User Experience

- [x] Navigasi jelas dan mudah
- [x] Mobile responsive
- [x] Kecepatan loading optimal
- [ ] Contact page atau about page yang lengkap
- [ ] Privacy Policy halaman
- [ ] Terms of Service halaman

## 3. Setup yang Perlu Dilakukan Sekarang

### A. Google Search Console Verification

1. Buka: https://search.google.com/search-console
2. Masukkan domain: mubarrok.my.id
3. Verifikasi via meta tag:
   - Copy verification code yang diberikan
   - Ganti `YOUR_GOOGLE_VERIFICATION_CODE` di file `/app/layout.tsx` dengan kode Anda
4. Submit sitemap: `https://mubarrok.my.id/sitemap.xml`

### B. Google Analytics Setup

1. Buat GA4 property: https://analytics.google.com
2. Copy Measurement ID (format: G-XXXXXXXXXX)
3. Ganti `YOUR_GOOGLE_ANALYTICS_ID` di `/app/layout.tsx`

### C. Google AdSense Ad Slots

Saat ini ada 3 ad slot yang sudah dikonfigurasi:

- Slot 1 (1234567890): Display ads
- Slot 2 (2468135791): Article ads
- Slot 3 (3691352468): Sidebar ads

**Ganti dengan ad slot ID Anda dari Google AdSense dashboard:**

1. Buka AdSense: https://www.google.com/adsense
2. Buat ad units dan dapatkan slot IDs
3. Update di `/components/google-ads.tsx`

## 4. Implementasi Ads di Template

### Homepage Banner

```tsx
import { GoogleAds } from "@/components/google-ads";

<GoogleAds />;
```

### Dalam Post Content

```tsx
import { GoogleAdsInArticle } from "@/components/google-ads";

<GoogleAdsInArticle />;
```

### Sidebar (untuk desktop)

```tsx
import { GoogleAdsSidebar } from "@/components/google-ads";

<GoogleAdsSidebar />;
```

## 5. Policy Compliance Checklist

- [ ] Tidak ada broken links
- [ ] Tidak ada malware/virus
- [ ] Tidak ada excessive ads (max 3 ads per halaman)
- [ ] Konten tidak melanggar copyright
- [ ] Tidak ada adult content
- [ ] Tidak ada clickbait headlines
- [ ] Tidak ada keyword stuffing
- [ ] Tidak ada cloaking

## 6. Timeline Approval

Google biasanya membutuhkan waktu:

- Initial review: 1-2 minggu
- Jika ditolak, revisi dan resubmit: 1-2 minggu lagi
- Jika approved: Mulai earning!

## 7. Tips untuk Approval Lebih Cepat

1. **Tulis konten yang lebih panjang** (1500+ kata)
2. **Tambah lebih banyak artikel** (target 30-50 articles)
3. **Optimasi untuk SEO** (gunakan Yoast SEO checker)
4. **Setup Analytics & Search Console** secepatnya
5. **Jangan pernah klik sendiri ads** (akan di-ban)
6. **Link ke sumber berkualitas** (external links)
7. **Update konten lama** dengan info terbaru
8. **Minimalkan ads sebelum approval** (baru pasang ads setelah approve)

## 8. Troubleshooting

### Website tidak bisa di-crawl

- Pastikan robots.txt tidak memblok Googlebot
- Submit URL ke Google Search Console
- Tunggu 1-2 minggu untuk crawling

### Ads tidak muncul setelah approval

- Pastikan ad slot ID benar
- Refresh page beberapa kali
- Clear browser cache
- Tunggu 24 jam untuk ads serve

### AdSense account di-suspend

- Jangan klik sendiri ads
- Jangan minta orang lain klik ads
- Jangan ada invalid traffic
- Review AdSense policies dengan teliti

## 9. Contacts & Resources

- AdSense Help: https://support.google.com/adsense
- Search Console Help: https://support.google.com/webmasters
- AdSense Policies: https://support.google.com/adsense/answer/48182

---

**Last Updated:** 14 Des 2024
**Status:** Setup siap untuk resubmission
