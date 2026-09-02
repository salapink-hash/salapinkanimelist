'use client'

import { useRouter } from "next/navigation"

export default function Header({ title }: { title: string }) {
  const router = useRouter()

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    router.back()
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <button 
        onClick={handleBack}
        style={{
          background: 'transparent',
          color: 'var(--primary)',
          border: '1px solid var(--primary)',
          padding: '0.5rem 1.5rem',
          borderRadius: '8px',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'var(--transition)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'var(--primary)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--primary)';
        }}
      >
        &larr; Back
      </button>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>
        {title}
      </h3>
    </div>
  )
}
