import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container animate-fade-in" style={{
      padding: '5rem 1.5rem',
      textAlign: 'center',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</span>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
        404 - Halaman Tidak Ditemukan
      </h1>
      <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
        Maaf, tautan anime atau artikel yang Anda cari mungkin telah dipindahkan atau sudah tidak tersedia.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link 
          href="/" 
          style={{
            background: 'var(--primary)',
            color: '#fff',
            padding: '0.75rem 1.75rem',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 700
          }}
        >
          &larr; Kembali ke Beranda
        </Link>
        <Link 
          href="/news" 
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--card-border)',
            color: '#fff',
            padding: '0.75rem 1.75rem',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Baca Artikel Anime
        </Link>
      </div>
    </div>
  )
}
