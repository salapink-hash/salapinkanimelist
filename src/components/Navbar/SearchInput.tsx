'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import styles from './Navbar.module.css'

export default function SearchInput() {
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const keyword = searchRef.current?.value

    if (keyword && keyword.trim() !== '') {
      router.push(`/search/${keyword.trim()}`)
    }
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search anime..."
        className={styles.searchInput}
        ref={searchRef}
      />
      <button type="submit" style={{ background: 'none', border: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center' }}>
        <svg
          className={styles.searchIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ cursor: 'pointer' }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  )
}
