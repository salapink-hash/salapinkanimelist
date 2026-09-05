'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('salapink_cookie_consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('salapink_cookie_consent', 'accepted')
    setShow(false)
  }

  if (!show) return null

  return (
    <aside 
      aria-label="Pemberitahuan Kuki"
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
        maxWidth: '520px',
        margin: '0 auto',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🍪</span>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          Kami menggunakan kuki (cookies) untuk meningkatkan kenyamanan penjelajahan dan menayangkan konten iklan yang relevan melalui Google AdSense. Baca selengkapnya di{' '}
          <Link href="/privacy-policy" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
            Kebijakan Privasi
          </Link>.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button
          onClick={handleAccept}
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1.25rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Saya Mengerti
        </button>
      </div>
    </aside>
  )
}
