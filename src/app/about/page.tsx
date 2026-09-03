import Header from '@/components/Dashboard/Header'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Kami (About Us) - Salapink Animelist',
  description: 'Mengenal lebih dekat Salapink Animelist, platform katalog dan komunitas pecinta anime Indonesia.',
}

export default function AboutPage() {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '900px', minHeight: '80vh' }}>
      <Header title="Tentang Salapink Animelist" />
      
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2.5rem',
        marginTop: '2rem',
        color: '#cbd5e1',
        lineHeight: 1.8,
        fontSize: '1.05rem'
      }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
          Platform Informasi & Komunitas Anime Terlengkap
        </h3>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>Salapink Animelist</strong> didirikan dengan misi untuk menyediakan referensi data anime yang akurat, cepat, dan mudah diakses bagi para penikmat anime di seluruh Indonesia.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Didukung oleh teknologi modern Next.js, Jikan API, dan basis data cloud berkecepatan tinggi, kami menyajikan informasi ribuan anime mulai dari judul legendaris, serial seasonal terkini, sinopsis lengkap, skor rating global, video trailer, hingga forum diskusi terbuka antar penonton.
        </p>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem' }}>
          Fitur Utama Kami:
        </h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
          <li><strong>Eksplorasi Anime Cepat:</strong> Temukan anime berdasarkan popularitas, skor rating, dan genre lengkap.</li>
          <li><strong>Koleksi Pribadi (Bookmark):</strong> Simpan anime favorit ke akun Anda hanya dengan satu klik.</li>
          <li><strong>Diskusi Komunitas:</strong> Tulis ulasan, komentar, dan bagikan pendapat bersama sesama penggemar.</li>
          <li><strong>Artikel & Rekomendasi:</strong> Baca panduan tontonan dan ulasan anime pilihan secara berkala.</li>
        </ul>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px' }}>
          <h4 style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Ingin Terhubung Bersama Kami?</h4>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            Punya saran, masukan, atau tawaran kerja sama? Kunjungi halaman <Link href="/contact" style={{ color: '#fff', fontWeight: 600, textDecoration: 'underline' }}>Kontak Kami</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
