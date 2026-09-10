'use client'

import { useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

interface VideoPlayerProps {
  youtubeId: string
  adUrl?: string
}

// Direct Link Iklan (Adsterra)
const DEFAULT_AD_URL = 'https://www.profitableratecpmnetwork.com/r1rawm4why?key=f5d07749e35ff0d63491ae12fbb21aea'

export default function VideoPlayer({ 
  youtubeId, 
  adUrl = DEFAULT_AD_URL 
}: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [hasClickedAd, setHasClickedAd] = useState(false)
  const [player, setPlayer] = useState<any>(null)

  const handleVideoPlayer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleOverlayClick = () => {
    // 1. Buka link iklan di tab baru
    if (typeof window !== 'undefined' && adUrl) {
      window.open(adUrl, '_blank', 'noopener,noreferrer')
    }

    // 2. Hilangkan overlay iklan
    setHasClickedAd(true)

    // 3. Otomatis mulai putar video
    if (player) {
      try {
        player.playVideo()
      } catch (err) {
        console.error('Auto-play error:', err)
      }
    }
  }

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target)
    // Pause di awal sampai user klik overlay
    event.target.pauseVideo()
  }

  return isOpen ? (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        width: '340px',
        maxWidth: 'calc(100vw - 2rem)',
        zIndex: 50,
        backgroundColor: '#111827',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(99, 102, 241, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header Player */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.6rem 1rem',
          backgroundColor: '#0f172a',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
          <h3 style={{ margin: 0, fontSize: '0.85rem', color: '#f8fafc', fontWeight: 600 }}>Trailer Anime</h3>
        </div>
        <button
          onClick={handleVideoPlayer}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: '2px 6px',
            borderRadius: '4px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
        >
          ✕
        </button>
      </div>

      {/* Video & Overlay Wrapper */}
      <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#000' }}>
        <YouTube
          videoId={youtubeId}
          onReady={onPlayerReady}
          opts={{
            width: '100%',
            height: '200',
            playerVars: {
              autoplay: 0,
              modestbranding: 1,
              rel: 0,
            },
          }}
        />

        {/* LK21-Style Ad Overlay */}
        {!hasClickedAd && (
          <div
            onClick={handleOverlayClick}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              backgroundColor: 'rgba(15, 17, 23, 0.94)',
              backdropFilter: 'blur(3px)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem',
              textAlign: 'center',
              boxSizing: 'border-box',
              userSelect: 'none',
            }}
          >
            {/* Box Card */}
            <div
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '0.75rem 0.85rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                width: '92%',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.2px',
                }}
              >
                Klik Di Mana Saja untuk Memulai Film
              </h4>

              <p
                style={{
                  margin: 0,
                  fontSize: '0.68rem',
                  fontStyle: 'italic',
                  color: '#cbd5e1',
                  lineHeight: '1.3',
                }}
              >
                &ldquo;Terima kasih sudah mengklik ku 1 kali, untuk menampilkan iklan dan <strong>Play Movie</strong>, mudah rezeki dan sehat terus buat kamu. Aamiin&rdquo;
              </p>

              <div
                style={{
                  marginTop: '0.2rem',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: '#eab308',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                }}
              >
                THIS PLAYER CONTAINS ADS
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <button
      onClick={handleVideoPlayer}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 50,
        backgroundColor: '#6366f1',
        color: '#fff',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '999px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.2s ease',
      }}
    >
      🎬 Tonton Trailer
    </button>
  )
}

