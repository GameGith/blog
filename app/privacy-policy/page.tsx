import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Mubarrok Tech Blog - Pelajari bagaimana kami mengelola data pribadi Anda",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="prose prose-invert max-w-none dark:prose-invert">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Kebijakan Privasi</h1>
        <p className="text-muted-foreground mb-8">
          Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">1. Pendahuluan</h2>
          <p className="mb-4 text-foreground/90">
            Mubarrok Tech Blog ("kami", "kami", atau "perusahaan") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi Anda ketika Anda mengunjungi situs web kami, termasuk produk, layanan, dan fitur apa pun yang tersedia di situs web kami (secara kolektif, "Situs" atau "Layanan").
          </p>
          <p className="mb-4 text-foreground/90">
            Harap baca Kebijakan Privasi ini dengan cermat. Jika Anda tidak setuju dengan kebijakan kami, harap jangan menggunakan Situs kami. Penggunaan berkelanjutan Situs kami setelah perubahan apa pun pada Kebijakan Privasi ini yang diposting akan dianggap sebagai persetujuan Anda terhadap perubahan tersebut.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">2. Informasi yang Kami Kumpulkan</h2>
          
          <h3 className="mb-3 text-xl font-semibold">Informasi yang Anda Berikan Secara Sukarela</h3>
          <p className="mb-4 text-foreground/90">
            Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Nama dan email Anda ketika Anda berlangganan newsletter kami</li>
            <li>Informasi akun (nama pengguna, email, password) jika Anda membuat akun</li>
            <li>Komentar, feedback, dan komunikasi yang Anda kirim melalui formulir kontak</li>
            <li>Informasi profil ketika Anda membuat akun penulis atau kontributor</li>
            <li>Informasi pembayaran jika Anda melakukan transaksi melalui situs kami</li>
          </ul>

          <h3 className="mb-3 text-xl font-semibold">Informasi yang Dikumpulkan Secara Otomatis</h3>
          <p className="mb-4 text-foreground/90">
            Ketika Anda mengunjungi Situs kami, kami secara otomatis mengumpulkan informasi tertentu tentang perangkat Anda, termasuk:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Alamat IP Anda</li>
            <li>Tipe browser dan sistem operasi</li>
            <li>Halaman yang Anda kunjungi dan waktu yang dihabiskan di setiap halaman</li>
            <li>Sumber rujukan (dari mana Anda datang ke situs kami)</li>
            <li>Tautan yang Anda klik di situs kami</li>
            <li>Data lokasi (jika Anda memberi izin)</li>
          </ul>

          <h3 className="mb-3 text-xl font-semibold">Cookies dan Teknologi Pelacakan Serupa</h3>
          <p className="mb-4 text-foreground/90">
            Kami menggunakan cookies, web beacons, pixels, dan teknologi pelacakan serupa untuk mengumpulkan dan menyimpan informasi tentang Anda dan aktivitas browsing Anda. Ini membantu kami untuk:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Mengingat preferensi dan pengaturan Anda</li>
            <li>Memahami bagaimana Anda menggunakan situs kami</li>
            <li>Meningkatkan pengalaman pengguna Anda</li>
            <li>Melayani iklan yang dipersonalisasi</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">3. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p className="mb-4 text-foreground/90">
            Kami menggunakan informasi yang kami kumpulkan untuk berbagai tujuan, termasuk:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Menyediakan, mengoperasikan, dan memelihara situs kami</li>
            <li>Meningkatkan, mempersonalisasi, dan memperluas situs kami</li>
            <li>Memahami dan menganalisis bagaimana Anda menggunakan situs kami</li>
            <li>Mengembangkan fitur, produk, dan layanan baru</li>
            <li>Berkomunikasi dengan Anda tentang pembaruan, keamanan, dan masalah administratif</li>
            <li>Mengirim Anda konten pemasaran dan promosi (jika Anda telah memberikan persetujuan)</li>
            <li>Merespons pertanyaan dan permintaan Anda</li>
            <li>Mencegah penipuan dan memastikan keamanan situs kami</li>
            <li>Mematuhi kewajiban hukum dan peraturan</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">4. Berbagi Informasi Anda</h2>
          <p className="mb-4 text-foreground/90">
            Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Namun, kami dapat membagikan informasi Anda dalam keadaan berikut:
          </p>
          
          <h3 className="mb-3 text-xl font-semibold">Penyedia Layanan Pihak Ketiga</h3>
          <p className="mb-4 text-foreground/90">
            Kami dapat membagikan informasi dengan penyedia layanan pihak ketiga yang membantu kami mengoperasikan situs kami dan menjalankan bisnis kami, seperti:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Penyedia hosting dan infrastruktur cloud (Supabase)</li>
            <li>Layanan analitik (Google Analytics)</li>
            <li>Penyedia email dan newsletter</li>
            <li>Pemroses pembayaran</li>
          </ul>
          <p className="mb-4 text-foreground/90">
            Penyedia layanan ini diikat oleh perjanjian kerahasiaan dan hanya dapat menggunakan informasi Anda sesuai dengan yang diperlukan untuk memberikan layanan kepada kami.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Persyaratan Hukum</h3>
          <p className="mb-4 text-foreground/90">
            Kami dapat mengungkapkan informasi Anda jika diwajibkan oleh hukum atau jika kami percaya dengan itikad baik bahwa pengungkapan tersebut diperlukan untuk:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Mematuhi undang-undang, peraturan, atau permintaan hukum</li>
            <li>Melindungi hak, privasi, keselamatan, atau properti kami atau orang lain</li>
            <li>Mendeteksi, mencegah, atau mengatasi penipuan, keamanan, atau masalah teknis</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">5. Keamanan Data</h2>
          <p className="mb-4 text-foreground/90">
            Kami mengimplementasikan langkah-langkah keamanan teknis, administratif, dan fisik yang wajar untuk melindungi informasi pribadi Anda dari akses, alterasi, pengungkapan, atau penghancuran yang tidak sah. Ini termasuk:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Enkripsi data dalam transit dan saat istirahat</li>
            <li>Kontrol akses dan autentikasi yang kuat</li>
            <li>Audit keamanan reguler dan pembaruan sistem</li>
            <li>Monitoring dan logging aktivitas</li>
          </ul>
          <p className="mb-4 text-foreground/90">
            Namun, tidak ada metode transmisi melalui Internet atau penyimpanan elektronik yang 100% aman. Meskipun kami berusaha keras untuk melindungi informasi pribadi Anda, kami tidak dapat menjamin keamanannya secara mutlak.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">6. Retensi Data</h2>
          <p className="mb-4 text-foreground/90">
            Kami menyimpan informasi pribadi Anda hanya selama diperlukan untuk memenuhi tujuan yang dijelaskan dalam Kebijakan Privasi ini, kecuali diwajibkan oleh hukum untuk menyimpannya lebih lama. Jika Anda meminta penghapusan akun, kami akan menghapus informasi pribadi Anda dalam jangka waktu yang wajar, meskipun kami dapat mempertahankan informasi tertentu yang diperlukan untuk kepatuhan hukum atau keperluan bisnis yang sah.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">7. Hak dan Pilihan Anda</h2>
          <p className="mb-4 text-foreground/90">
            Anda memiliki hak-hak tertentu sehubungan dengan informasi pribadi kami yang kami pegang:
          </p>
          
          <h3 className="mb-3 text-xl font-semibold">Akses dan Portabilitas</h3>
          <p className="mb-4 text-foreground/90">
            Anda dapat meminta salinan data pribadi Anda dalam format yang dapat dibaca mesin dan portabel.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Koreksi</h3>
          <p className="mb-4 text-foreground/90">
            Anda dapat meminta untuk mengoreksi informasi pribadi Anda yang tidak akurat atau tidak lengkap.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Penghapusan</h3>
          <p className="mb-4 text-foreground/90">
            Anda dapat meminta penghapusan informasi pribadi Anda, dengan beberapa pengecualian untuk tujuan hukum atau bisnis yang sah.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Keberatan dan Pembatasan</h3>
          <p className="mb-4 text-foreground/90">
            Anda dapat keberatan dengan pemrosesan data pribadi Anda atau meminta pembatasan pemrosesan tertentu.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Opt-Out dari Komunikasi Pemasaran</h3>
          <p className="mb-4 text-foreground/90">
            Anda dapat memilih untuk tidak menerima email pemasaran kami dengan mengklik tautan "unsubscribe" di email kami atau menghubungi kami langsung.
          </p>

          <h3 className="mb-3 text-xl font-semibold">Cookie Preferences</h3>
          <p className="mb-4 text-foreground/90">
            Anda dapat mengontrol preferensi cookie melalui pengaturan browser Anda. Namun, menonaktifkan beberapa cookies mungkin mempengaruhi fungsionalitas situs kami.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">8. Peraturan dan Perlindungan Data Internasional</h2>
          <p className="mb-4 text-foreground/90">
            Situs kami beroperasi di Indonesia. Informasi Anda dapat ditransfer ke, disimpan di, dan diproses di negara-negara lain, termasuk negara-negara yang mungkin tidak memiliki tingkat perlindungan data yang sama seperti yurisdiksi tempat Anda tinggal. Dengan menggunakan situs kami, Anda setuju untuk transfer informasi pribadi Anda ke negara-negara di luar negara asal Anda.
          </p>
          <p className="mb-4 text-foreground/90">
            Kami mematuhi semua undang-undang perlindungan data yang berlaku, termasuk Peraturan Perlindungan Data Umum (GDPR) jika Anda berada di Uni Eropa.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">9. Konten Pihak Ketiga dan Tautan Eksternal</h2>
          <p className="mb-4 text-foreground/90">
            Situs kami dapat berisi tautan ke situs web pihak ketiga dan konten yang disematkan dari platform lain. Kami tidak bertanggung jawab atas praktik privasi situs atau layanan pihak ketiga. Kami menyarankan Anda meninjau kebijakan privasi mereka sebelum memberikan informasi pribadi Anda kepada mereka.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">10. Perubahan pada Kebijakan Privasi Ini</h2>
          <p className="mb-4 text-foreground/90">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami, teknologi, persyaratan hukum, atau alasan lainnya. Kami akan memberi tahu Anda tentang perubahan material dengan memposting Kebijakan Privasi baru di situs kami dan memperbarui tanggal "Terakhir Diperbarui" di bagian atas halaman ini. Penggunaan berkelanjutan Anda atas Situs setelah perubahan tersebut akan dianggap sebagai persetujuan Anda terhadap Kebijakan Privasi baru.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">11. Hubungi Kami</h2>
          <p className="mb-4 text-foreground/90">
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, praktik privasi kami, atau ingin menggunakan hak privasi Anda, silakan hubungi kami di:
          </p>
          <div className="mb-6 rounded-lg border border-border/40 bg-background/60 p-6">
            <p className="font-semibold text-foreground mb-2">Mubarrok Tech Blog</p>
            <p className="text-foreground/90 mb-1">Email: privacy@mubarrok.my.id</p>
            <p className="text-foreground/90 mb-1">Website: https://blog.mubarrok.my.id</p>
            <p className="text-foreground/90">Lokasi: Indonesia</p>
          </div>
          <p className="text-foreground/90">
            Kami akan berusaha merespons pertanyaan Anda dalam jangka waktu 30 hari.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">12. Persetujuan Anda</h2>
          <p className="mb-4 text-foreground/90">
            Dengan menggunakan situs web kami, Anda menyetujui Kebijakan Privasi kami. Jika Anda tidak setuju dengan kebijakan ini, harap jangan menggunakan situs kami. Penggunaan berkelanjutan Anda atas situs kami setelah perubahan apa pun pada Kebijakan Privasi ini akan dianggap sebagai persetujuan Anda.
          </p>
        </section>

        <div className="mt-12 rounded-lg border border-border/40 bg-primary/5 p-6">
          <p className="text-sm text-muted-foreground">
            Kebijakan Privasi ini efektif mulai dari tanggal di atas. Versi sebelumnya tersedia untuk referensi.
          </p>
        </div>
      </article>
    </main>
  );
}
