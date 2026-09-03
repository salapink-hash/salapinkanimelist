'use client'

import { useState } from 'react'

export default function SupportButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Action Button */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem'
      }}>
        {/* Modal Popup Donasi */}
        {isOpen && (
          <div className="animate-fade-in" style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: '16px',
            padding: '1.5rem',
            width: '280px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            textAlign: 'center'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              ☕ Dukung Salapink
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
              Bantu operasional server website kami agar tetap cepat & bebas iklan mengganggu.
            </p>
            
            <a
              href="https://saweria.co"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#000',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none',
                marginBottom: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
              }}
            >
              💛 Donasi via Saweria / QRIS
            </a>
            
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: '0.25rem'
              }}
            >
              Tutup
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.25rem',
            borderRadius: '999px',
            fontSize: '0.9rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 10px 20px -5px rgba(236, 72, 153, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Dukung Salapink Animelist"
        >
          <span>☕</span>
          <span>Dukung Kami</span>
        </button>
      </div>
    </>
  )
}
