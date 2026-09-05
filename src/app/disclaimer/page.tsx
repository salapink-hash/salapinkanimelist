import Header from '@/components/Dashboard/Header'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Penafian Hak Cipta (Disclaimer & DMCA) - Salapink Animelist',
  description: 'Kebijakan hak cipta, DMCA, dan penafian penggunaan data pihak ketiga di Salapink Animelist.',
}

export default function DisclaimerPage() {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '900px', minHeight: '80vh' }}>
      <Header title="Penafian & DMCA (Disclaimer)" />
      
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2.5rem',
        marginTop: '2rem',
        color: '#cbd5e1',
        lineHeight: 1.8,
        fontSize: '1rem'
      }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
          1. Hak Cipta dan Kepemilikan Materi
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>Salapink Animelist</strong> (<a href="https://salapink.web.id" style={{ color: 'var(--primary)' }}>https://salapink.web.id</a>) adalah platform katalog, referensi ensiklopedia, dan komunitas penggemar anime yang beroperasi secara independen untuk tujuan informasi, pendidikan, dan ulasan (*fair use*).
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Semua nama judul anime, karakter, sinopsis, ilustrasi, gambar mini (*thumbnails*), dan video cuplikan (*trailer*) yang tercantum di situs web ini adalah hak cipta milik masing-masing studio animasi, pembuat manga (*mangaka*), produser, dan pemegang lisensi resmi terkait (seperti Aniplex, Toei Animation, MAPPA, Ufotable, Kadokawa, Crunchyroll, dll.).
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          2. Sumber Data Pihak Ketiga & Non-Hosting Video
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Salapink Animelist <strong>tidak pernah menyimpan, mengunggah, maupun mendistribusikan file video anime berhak cipta</strong> pada server kami sendiri. Seluruh data ringkasan anime dan gambar diperoleh melalui API publik pihak ketiga yang legal (Jikan API / MyAnimeList API), sedangkan video trailer disematkan (*embed*) secara langsung dari kanal resmi YouTube.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          3. Pemberitahuan Pelanggaran DMCA / Permohonan Takedown
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Kami sepenuhnya menghormati hak kekayaan intelektual orang lain. Jika Anda adalah pemegang hak cipta sah atas suatu konten atau materi yang ditampilkan di situs kami dan merasa materi tersebut disajikan tanpa izin, silakan ajukan permohonan penghapusan (*takedown notice*) dengan menyertakan bukti kepemilikan hak cipta melalui halaman <Link href="/contact" style={{ color: 'var(--primary)', fontWeight: 600 }}>Hubungi Kami</Link>.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Tim kami akan memproses dan menindaklanjuti setiap permohonan sah dalam waktu maksimal 2 x 24 jam kerja.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          4. Batasan Tanggung Jawab
        </h3>
        <p>
          Salapink Animelist berusaha sebaik mungkin untuk menyajikan informasi yang akurat dan terkini. Namun, kami tidak memberikan jaminan mutlak atas kelengkapan atau keakuratan seluruh data pihak ketiga. Penggunaan informasi di situs ini sepenuhnya menjadi risiko dan tanggung jawab masing-masing pengunjung.
        </p>
      </div>
    </div>
  )
}
