import Link from 'next/link'
import styles from './Navbar.module.css'
import SearchInput from './SearchInput'
import UserActionButton from './UserActionButton'

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.navContainer}`} style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <Link href="/" className={styles.logo}>
            Salapink<span className="text-gradient">Animelist</span>
          </Link>
          <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>
              Beranda
            </Link>
            <Link 
              href="/movies" 
              style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', 
                color: '#fff', 
                fontSize: '0.9rem', 
                fontWeight: 800, 
                textDecoration: 'none',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)'
              }}
            >
              🎬 Cinema
            </Link>
            <Link href="/gacha" style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none' }}>
              🎲 Gacha
            </Link>
            <Link href="/jadwal" style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>
              📅 Jadwal
            </Link>
            <Link href="/populer" style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>
              Populer
            </Link>
            <Link href="/news" style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>
              Berita
            </Link>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <SearchInput />
          <UserActionButton />
        </div>
      </div>
    </header>
  )
}
