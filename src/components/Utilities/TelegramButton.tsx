'use client'

import { useState } from 'react'

// Ganti username/link ini jika channel Telegram kamu sudah dibuat
const TELEGRAM_URL = 'https://t.me/salapinkcinema'

export default function TelegramButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.5rem',
      }}
    >
      {/* Tooltip Info Anti-Blokir */}
      {isHovered && (
        <div
          className="animate-fade-in"
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(34, 158, 217, 0.4)',
            borderRadius: '10px',
            padding: '0.5rem 0.85rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: '0.78rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          📢 <strong>Info Domain Baru & Update Film Bioskop</strong>
        </div>
      )}

      {/* Floating Telegram Action Button */}
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'linear-gradient(135deg, #2aabee 0%, #229ed9 50%, #0088cc 100%)',
          color: '#ffffff',
          textDecoration: 'none',
          padding: '0.7rem 1.15rem',
          borderRadius: '999px',
          fontSize: '0.88rem',
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.55rem',
          boxShadow: '0 8px 20px -4px rgba(0, 136, 204, 0.6), 0 0 15px rgba(42, 171, 238, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isHovered ? 'translateY(-2px) scale(1.04)' : 'none',
        }}
        title="Gabung Channel Telegram Salapink Cinema"
      >
        {/* Telegram SVG Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: 'translate(-1px, 1px)' }}
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>

        <span>Join Telegram</span>

        {/* Live indicator dot */}
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#4ade80',
            boxShadow: '0 0 6px #4ade80',
            display: 'inline-block',
          }}
        />
      </a>
    </div>
  )
}
