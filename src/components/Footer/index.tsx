import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(15, 17, 26, 0.95)',
      borderTop: '1px solid var(--card-border)',
      marginTop: '5rem',
      padding: '3rem 0 2rem 0',
      color: '#94a3b8',
      fontSize: '0.9rem'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Brand & About */}
        <div>
          <Link href="/" style={{ textDecoration: 'none', fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'inline-block', marginBottom: '1rem' }}>
            Salapink<span className="text-gradient">Animelist</span>
          </Link>
          <p style={{ lineHeight: 1.6, color: '#94a3b8' }}>
            Portal referensi data anime terlengkap dan platform komunitas wibu Indonesia. Temukan anime favorit, baca berita terkini, dan buat koleksi pribadimu.
          </p>
        </div>

        {/* Navigasi Utama */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Jelajahi</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li><Link href="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Beranda</Link></li>
            <li><Link href="/populer" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Anime Terpopuler</Link></li>
            <li><Link href="/news" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Berita & Artikel</Link></li>
            <li><Link href="/users/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Dashboard Saya</Link></li>
          </ul>
        </div>

        {/* Legal & Informasi */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Legal & Bantuan</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li><Link href="/about" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Tentang Kami</Link></li>
            <li><Link href="/privacy-policy" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Kebijakan Privasi</Link></li>
            <li><Link href="/terms" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Syarat & Ketentuan</Link></li>
            <li><Link href="/disclaimer" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Penafian & DMCA</Link></li>
            <li><Link href="/contact" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Hubungi Kami</Link></li>
            <li><a href="https://saweria.co/salapink" target="_blank" rel="noopener noreferrer" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 600 }}>☕ Donasi Saweria</a></li>
          </ul>
        </div>
      </div>

      <div className="container" style={{
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.85rem'
      }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} <strong>Salapink Animelist</strong>. All Rights Reserved. Data provided by Jikan API.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/privacy-policy" style={{ color: '#94a3b8' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#94a3b8' }}>Terms</Link>
          <Link href="/disclaimer" style={{ color: '#94a3b8' }}>DMCA</Link>
          <Link href="/contact" style={{ color: '#94a3b8' }}>Contact</Link>
        </div>
      </div>
    </footer>
  )
}
