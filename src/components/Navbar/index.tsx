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
        <Link href="/" className={styles.logo}>
          salapink<span className="text-gradient">AnimeList</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <SearchInput />
          <UserActionButton />
        </div>
      </div>
    </header>
  )
}
