import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan",
  description: "Syarat dan Ketentuan Mubarrok Tech Blog - Baca persyaratan penggunaan situs kami",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="prose prose-invert max-w-none dark:prose-invert">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Syarat dan Ketentuan</h1>
        <p className="text-muted-foreground mb-8">
          Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">1. Penerimaan Syarat</h2>
          <p className="mb-4 text-foreground/90">
            Dengan mengakses dan menggunakan situs web Mubarrok Tech Blog ("Situs", "kami", "kami", atau "perusahaan"), Anda menerima dan setuju untuk terikat oleh syarat dan ketentuan penggunaan ini ("Syarat"). Jika Anda tidak setuju untuk mematuhi Syarat ini, Anda mungkin tidak menggunakan Situs.
          </p>
          <p className="mb-4 text-foreground/90">
            Kami berhak untuk mengubah Syarat ini kapan saja. Perubahan akan berlaku segera setelah diposting ke Situs. Penggunaan berkelanjutan Anda atas Situs setelah perubahan tersebut akan dianggap sebagai penerimaan Syarat yang dimodifikasi.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">2. Lisensi Penggunaan</h2>
          <p className="mb-4 text-foreground/90">
            Dengan syarat kepatuhan Anda terhadap Syarat ini, kami memberikan Anda lisensi terbatas, non-eksklusif, dapat dibatalkan untuk mengakses dan menggunakan Situs untuk tujuan pribadi, non-komersial Anda. Lisensi ini tidak mencakup:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Menjual, menjual kembali, atau memanfaatkan konten Situs untuk keuntungan komersial</li>
            <li>Mereproduksi, mendistribusikan, atau menampilkan konten Situs tanpa izin tertulis kami</li>
            <li>Memodifikasi atau membuat karya turunan dari Situs atau kontennya</li>
            <li>Mengakses atau menggunakan Situs dengan cara otomatis (scraping, crawling, dll.) tanpa izin</li>
            <li>Mengganggu atau membebani layanan Situs kami</li>
            <li>Menggunakan Situs untuk tujuan yang melanggar hukum atau merugikan orang lain</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">3. Konten Pengguna</h2>
          <p className="mb-4 text-foreground/90">
            Jika Anda membuat akun, mengirimkan komentar, atau memberikan konten lain ("Konten Pengguna"), Anda mempertahankan hak kepemilikan atas Konten Pengguna Anda. Namun, dengan mengirimkan Konten Pengguna, Anda memberikan kami lisensi worldwide, royalti-free, non-eksklusif, dapat disublisensikan, dan dapat ditransfer untuk menggunakan, mereproduksi, memodifikasi, menampilkan, dan mendistribusikan Konten Pengguna Anda di Situs kami dan saluran lainnya.
          </p>
          <p className="mb-4 text-foreground/90">
            Anda memastikan bahwa Konten Pengguna Anda:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Adalah asli dan dimiliki atau dilisensikan oleh Anda</li>
            <li>Tidak melanggar hak kekayaan intelektual orang lain</li>
            <li>Tidak mengandung materi yang menyinggung, berbahaya, atau ilegal</li>
            <li>Tidak mengandung spam atau pesan komersial yang tidak diminta</li>
            <li>Tidak mengandung virus atau kode berbahaya</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">4. Kekayaan Intelektual</h2>
          <p className="mb-4 text-foreground/90">
            Situs dan semua konten yang diposting di dalamnya, termasuk teks, grafik, logo, gambar, audio, video, dan perangkat lunak ("Konten"), adalah kepemilikan kami atau pemberi lisensi kami dan dilindungi oleh undang-undang hak cipta, merek dagang, dan kekayaan intelektual lainnya.
          </p>
          <p className="mb-4 text-foreground/90">
            Anda tidak dapat menggunakan Konten kami tanpa izin eksplisit tertulis dari kami, kecuali untuk tujuan berikut:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Melihat dan membaca artikel untuk penggunaan pribadi</li>
            <li>Membuat tautan ke Situs kami dari situs web Anda sendiri</li>
            <li>Membagikan artikel melalui media sosial (dengan atribusi yang tepat)</li>
          </ul>
          <p className="mb-4 text-foreground/90">
            Penggunaan apa pun di luar yang diizinkan secara eksplisit di sini merupakan pelanggaran hak cipta dan akan mengakibatkan tindakan hukum.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">5. Akun Pengguna</h2>
          <p className="mb-4 text-foreground/90">
            Jika Anda membuat akun di Situs kami, Anda bertanggung jawab untuk menjaga kerahasiaan password Anda dan bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda. Anda setuju untuk:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Memberikan informasi yang akurat, lengkap, dan terkini saat mendaftar</li>
            <li>Memperbarui informasi akun Anda sesuai kebutuhan</li>
            <li>Segera memberitahu kami tentang penggunaan akun yang tidak sah</li>
            <li>Mematuhi semua hukum dan peraturan yang berlaku</li>
          </ul>
          <p className="mb-4 text-foreground/90">
            Kami berhak untuk menangguhkan atau menghapus akun Anda jika kami percaya Anda melanggar Syarat ini atau melakukan aktivitas yang mencurigakan atau berbahaya.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">6. Konten Konten yang Dilarang</h2>
          <p className="mb-4 text-foreground/90">
            Anda setuju untuk tidak mengirimkan, memposting, atau mempublikasikan konten apa pun di Situs yang:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Melanggar hukum atau peraturan yang berlaku</li>
            <li>Mengandung ancaman, pelecehan, atau intimidasi</li>
            <li>Mendiskriminasi orang berdasarkan ras, warna, agama, jenis kelamin, usia, atau status lainnya</li>
            <li>Mengandung konten seksual atau kekerasan yang eksplisit</li>
            <li>Mempromosikan produk atau layanan ilegal</li>
            <li>Mengandung virus, malware, atau kode berbahaya lainnya</li>
            <li>Meniru atau menyamar sebagai orang lain</li>
            <li>Mengandung informasi pribadi orang lain tanpa persetujuan</li>
            <li>Melanggar privasi atau merek dagang orang lain</li>
            <li>Mengandung spam atau iklan komersial yang tidak diminta</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">7. Penghapusan Konten</h2>
          <p className="mb-4 text-foreground/90">
            Kami berhak, tanpa tanggung jawab, untuk menghapus, memodifikasi, atau menangguhkan akses ke konten atau akun apa pun yang kami percaya melanggar Syarat ini atau undang-undang yang berlaku. Kami tidak wajib memberikan pemberitahuan sebelumnya, tetapi kami akan berusaha untuk melakukannya jika memungkinkan.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">8. Tautan Pihak Ketiga</h2>
          <p className="mb-4 text-foreground/90">
            Situs kami mungkin berisi tautan ke situs web pihak ketiga. Kami tidak mengontrol dan tidak bertanggung jawab atas konten, keakuratan, atau praktik privasi situs pihak ketiga ini. Penggunaan Anda atas tautan apa pun ke situs pihak ketiga adalah atas risiko Anda sendiri dan tunduk pada syarat dan ketentuan situs tersebut.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">9. Penyangkalan Jaminan</h2>
          <p className="mb-4 text-foreground/90">
            SITUS DAN KONTEN DISEDIAKAN ATAS DASAR "SEBAGAIMANA ADANYA" DAN "SEBAGAIMANA TERSEDIA" TANPA JAMINAN DARI JENIS APA PUN, BAIK TERSURAT MAUPUN TERSIRAT. KAMI SECARA EKSPLISIT MENOLAK SEMUA JAMINAN, TERMASUK NAMUN TIDAK TERBATAS PADA JAMINAN YANG TERSIRAT DARI KELAYAKAN UNTUK DIPERDAGANGKAN, KESESUAIAN UNTUK TUJUAN TERTENTU, DAN NON-PELANGGARAN.
          </p>
          <p className="mb-4 text-foreground/90">
            KAMI TIDAK MENJAMIN BAHWA SITUS AKAN TIDAK TERPUTUS, TANPA KESALAHAN, ATAU AMAN. KAMI TIDAK MENJAMIN KEAKURATAN, KELENGKAPAN, ATAU KEANDALAN KONTEN APA PUN DI SITUS KAMI.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">10. Pembatasan Tanggung Jawab</h2>
          <p className="mb-4 text-foreground/90">
            DALAM BATAS YANG DIIZINKAN OLEH HUKUM, KAMI TIDAK AKAN BERTANGGUNG JAWAB ATAS KERUSAKAN APA PUN, TERMASUK NAMUN TIDAK TERBATAS PADA KERUSAKAN LANGSUNG, TIDAK LANGSUNG, INSIDENTAL, KHUSUS, KONSEKUENSIAL, ATAU PUNITIF, YANG TIMBUL DARI:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Penggunaan atau ketidakmampuan menggunakan Situs</li>
            <li>Konten atau informasi apa pun yang diperoleh melalui Situs</li>
            <li>Akses tidak sah ke sistem atau informasi pribadi Anda</li>
            <li>Pernyataan atau tindakan pihak ketiga apa pun</li>
          </ul>
          <p className="mb-4 text-foreground/90">
            Batasan ini berlaku bahkan jika kami telah diberitahu tentang kemungkinan kerusakan tersebut.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">11. Kompensasi</h2>
          <p className="mb-4 text-foreground/90">
            Anda setuju untuk membela, mengindemnifikasi, dan menahan kami, para direktur, petugas, karyawan, dan agen kami tidak berbahaya dari dan terhadap semua tuntutan, tanggung jawab, kerusakan, kehilangan, dan biaya (termasuk biaya hukum) yang timbul dari atau berkaitan dengan:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Penggunaan Anda atas Situs atau konten apa pun di dalamnya</li>
            <li>Pelanggaran Anda terhadap Syarat ini atau hukum atau peraturan apa pun</li>
            <li>Konten Pengguna Anda atau perilaku Anda di Situs</li>
            <li>Tuntutan pihak ketiga apa pun yang timbul dari penggunaan Anda atas Situs</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">12. Terminasi</h2>
          <p className="mb-4 text-foreground/90">
            Kami berhak untuk menghentikan akses Anda ke Situs kapan saja, dengan atau tanpa alasan, dengan atau tanpa pemberitahuan. Anda juga dapat menghentikan penggunaan Situs kapan saja. Semua ketentuan Syarat yang menurut sifatnya harus tetap berlaku setelah terminasi akan tetap berlaku.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">13. Hukum yang Berlaku dan Yurisdiksi</h2>
          <p className="mb-4 text-foreground/90">
            Syarat ini diatur dan ditafsirkan sesuai dengan hukum Indonesia, tanpa memandang prinsip-prinsip konflik hukumnya. Dengan menggunakan Situs, Anda secara tidak terbatas menerima yurisdiksi eksklusif dan tempat yang kompeten dari pengadilan Indonesia untuk menyelesaikan setiap perselisihan yang mungkin timbul dari penggunaan Situs ini.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">14. Pembatalan</h2>
          <p className="mb-4 text-foreground/90">
            Jika ada ketentuan dalam Syarat ini yang dinyatakan tidak dapat diberlakukan atau tidak sah, ketentuan tersebut harus diubah ke tingkat minimum yang diperlukan untuk membuatnya dapat diberlakukan, atau jika tidak mungkin, ketentuan tersebut harus dibatalkan. Semua ketentuan lainnya akan tetap berlaku sepenuhnya.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">15. Seluruh Perjanjian</h2>
          <p className="mb-4 text-foreground/90">
            Syarat ini, bersama dengan Kebijakan Privasi kami dan dokumen lain yang dirujuk di sini, merupakan seluruh perjanjian antara Anda dan kami mengenai penggunaan Situs dan menggantikan semua perjanjian, pemahaman, dan perwakilan sebelumnya.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">16. Pemberitahuan Hak Cipta dan DMCA</h2>
          <p className="mb-4 text-foreground/90">
            Jika Anda percaya bahwa konten apa pun di Situs kami melanggar hak cipta Anda, silakan hubungi kami dengan informasi berikut:
          </p>
          <ul className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
            <li>Deskripsi karya berhak cipta yang dilanggar</li>
            <li>URL di mana karya berhak cipta berada di Situs kami</li>
            <li>Informasi kontak Anda dan pernyataan bahwa Anda adalah pemilik hak cipta atau diberi otorisasi untuk bertindak atas nama pemilik hak cipta</li>
            <li>Pernyataan yang dibuat di bawah sumpah bahwa Anda percaya penggunaan konten adalah pelanggaran dan bahwa informasi yang Anda berikan akurat</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">17. Hubungi Kami</h2>
          <p className="mb-4 text-foreground/90">
            Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini atau penggunaan Situs kami, silakan hubungi kami di:
          </p>
          <div className="mb-6 rounded-lg border border-border/40 bg-background/60 p-6">
            <p className="font-semibold text-foreground mb-2">Mubarrok Tech Blog</p>
            <p className="text-foreground/90 mb-1">Email: hello@mubarrok.my.id</p>
            <p className="text-foreground/90 mb-1">Website: https://blog.mubarrok.my.id</p>
            <p className="text-foreground/90">Lokasi: Indonesia</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">18. Pengakuan Anda</h2>
          <p className="mb-4 text-foreground/90">
            DENGAN MENGGUNAKAN SITUS KAMI, ANDA MENGAKUI BAHWA ANDA TELAH MEMBACA SYARAT DAN KETENTUAN INI, MEMAHAMI MEREKA, DAN SETUJU UNTUK TERIKAT OLEH MEREKA. JIKA ANDA TIDAK SETUJU DENGAN SYARAT ATAU BAGIAN INTI DARI SYARAT INI, ANDA MUNGKIN TIDAK MENGGUNAKAN SITUS.
          </p>
        </section>

        <div className="mt-12 rounded-lg border border-border/40 bg-primary/5 p-6">
          <p className="text-sm text-muted-foreground">
            Syarat dan Ketentuan ini efektif mulai dari tanggal di atas. Versi sebelumnya tersedia untuk referensi. Kami berhak untuk memperbarui Syarat ini kapan saja, dan Anda bertanggung jawab untuk memeriksa pembaruan secara berkala.
          </p>
        </div>
      </article>
    </main>
  );
}
