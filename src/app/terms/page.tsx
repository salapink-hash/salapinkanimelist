import Header from '@/components/Dashboard/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan (Terms of Service) - Salapink Animelist',
  description: 'Syarat dan ketentuan penggunaan situs Salapink Animelist.',
}

export default function TermsPage() {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '900px', minHeight: '80vh' }}>
      <Header title="Syarat dan Ketentuan (Terms of Service)" />
      
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
          1. Ketentuan Penggunaan
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Dengan mengakses situs web <strong>Salapink Animelist</strong>, Anda setuju untuk terikat oleh Syarat dan Ketentuan Penggunaan ini, semua hukum dan peraturan yang berlaku, serta bertanggung jawab atas kepatuhan terhadap hukum setempat yang berlaku.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          2. Hak Kekayaan Intelektual & Sumber Data
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Semua data judul anime, sinopsis, skor, karakter, dan gambar mini yang ditampilkan di situs ini bersumber dari API publik pihak ketiga (seperti Jikan / MyAnimeList API) untuk tujuan informasi dan referensi penggemar. Hak cipta gambar dan materi anime tetap sepenuhnya menjadi milik produser, studio animasi, dan pemegang lisensi resmi terkait.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          3. Etika Kolom Diskusi & Komentar
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Pengguna yang menggunakan fitur komentar dilarang menyebarkan ujaran kebencian, konten SARA, spam, pornografi, maupun tautan ilegal berbahaya. Salapink Animelist berhak menghapus komentar dan membatasi akun yang melanggar ketentuan komunitas ini tanpa pemberitahuan sebelumnya.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          4. Perubahan Ketentuan
        </h3>
        <p>
          Salapink Animelist dapat merevisi syarat dan ketentuan layanan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Dengan terus menggunakan situs ini, Anda dianggap menyetujui versi terbaru dari Syarat dan Ketentuan ini.
        </p>
      </div>
    </div>
  )
}
