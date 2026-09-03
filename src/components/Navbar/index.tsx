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
