import Header from '@/components/Dashboard/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi (Privacy Policy) - Salapink Animelist',
  description: 'Kebijakan privasi resmi penggunaan layanan Salapink Animelist dan kebijakan data pengguna.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '900px', minHeight: '80vh' }}>
      <Header title="Kebijakan Privasi (Privacy Policy)" />
      
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
        <p style={{ marginBottom: '1.5rem' }}>
          Selamat datang di <strong>Salapink Animelist</strong> (dapat diakses melalui <a href="https://salapink.web.id" style={{ color: 'var(--primary)' }}>https://salapink.web.id</a>). Kami sangat menghargai privasi setiap pengunjung. Dokumen Kebijakan Privasi ini menjelaskan jenis informasi yang dikumpulkan dan dicatat oleh Salapink Animelist serta bagaimana kami menggunakannya.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          1. Informasi yang Kami Kumpulkan
        </h3>
        <p style={{ marginBottom: '1rem' }}>
          Ketika Anda menggunakan fitur masuk (Sign In) menggunakan akun pihak ketiga seperti Google atau GitHub, kami hanya menerima informasi dasar profil publik berupa:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li>Nama profil pengguna (Username)</li>
          <li>Alamat surat elektronik (Email)</li>
          <li>Foto profil publik (Avatar)</li>
        </ul>
        <p style={{ marginBottom: '1.5rem' }}>
          Kami <strong>tidak pernah</strong> memiliki akses ke kata sandi (password) akun Google atau GitHub Anda.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          2. Log Files (File Catatan Server)
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Salapink Animelist mengikuti prosedur standar dalam menggunakan file log. File-file ini mencatat pengunjung saat mereka mengunjungi situs web. Informasi yang dikumpulkan oleh file log meliputi alamat protokol internet (IP address), jenis browser, Penyedia Layanan Internet (ISP), tanggal dan waktu, halaman rujukan/keluar, dan jumlah klik. Informasi ini digunakan untuk menganalisis tren, mengelola situs, melacak pergerakan pengguna di situs, dan mengumpulkan informasi demografis.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          3. Cookies dan Web Beacons
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Seperti halnya situs web lain, Salapink Animelist menggunakan 'cookies'. Cookies ini digunakan untuk menyimpan preferensi pengunjung dan halaman di situs web yang diakses pengunjung untuk mengoptimalkan pengalaman pengguna.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          4. Mitra Periklanan Google DoubleClick DART Cookie
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Google adalah salah satu vendor pihak ketiga di situs kami. Google juga menggunakan cookies, yang dikenal sebagai cookies DART, untuk menayangkan iklan kepada pengunjung situs kami berdasarkan kunjungan mereka ke situs kami dan situs lain di internet. Pengunjung dapat memilih untuk menolak penggunaan cookies DART dengan mengunjungi Kebijakan Privasi jaringan iklan dan konten Google di URL berikut: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://policies.google.com/technologies/ads</a>.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          5. Kebijakan Privasi Pihak Ketiga
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Kebijakan Privasi Salapink Animelist tidak berlaku untuk pengiklan atau situs web lain. Oleh karena itu, kami menyarankan Anda untuk berkonsultasi dengan Kebijakan Privasi masing-masing dari server iklan pihak ketiga ini untuk informasi yang lebih terperinci.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          6. Persetujuan
        </h3>
        <p>
          Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui syarat dan ketentuannya.
        </p>
      </div>
    </div>
  )
}
