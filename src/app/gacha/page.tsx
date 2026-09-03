'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Dashboard/Header'

interface AnimeResult {
  mal_id: number
  title: string
  title_japanese?: string
  images: {
    webp: {
      image_url: string
      large_image_url?: string
    }
  }
  score: number
  synopsis: string
  genres: { name: string }[]
  episodes: number
  year: number
}

const GENRES = [
  { id: 0, name: 'Semua Genre' },
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 36, name: 'Slice of Life' },
  { id: 37, name: 'Supernatural' },
  { id: 62, name: 'Isekai' },
]

export default function GachaPage() {
  const [selectedGenre, setSelectedGenre] = useState<number>(0)
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState<AnimeResult | null>(null)
  const [copied, setCopied] = useState(false)

  const handleRoll = async () => {
    setIsRolling(true)
    setCopied(false)

    try {
      const genreParam = selectedGenre > 0 ? `?genre=${selectedGenre}` : ''
      const response = await fetch(`/api/v1/gacha${genreParam}`)
      const resJson = await response.json()

      if (resJson?.data) {
        setResult(resJson.data)
      } else {
        alert('Sedang banyak permintaan. Silakan klik tombol gacha sekali lagi!')
      }
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan. Silakan coba klik gacha sekali lagi!')
    } finally {
      setIsRolling(false)
    }
  }

  const handleShare = () => {
    if (!result) return
    const text = `Saya mendapatkan anime "${result.title}" (Skor: ${result.score || '-'}) di Gacha Anime Salapink! Coba gacha anime kamu di: https://salapink.web.id/gacha`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '85vh', maxWidth: '900px' }}>
      <Header title="🎲 Gacha Anime / Random Picker" />
      <p style={{ color: '#94a3b8', margin: '0.5rem 0 2rem 0', fontSize: '1.05rem' }}>
        Bingung mau nonton anime apa hari ini? Putar roda keberuntungan dan biarkan sistem memilihkan anime terbaik untukmu!
      </p>

      {/* Filter Genre */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <label style={{ display: 'block', color: '#fff', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
          Pilih Kategori Genre:
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {GENRES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGenre(g.id)}
              style={{
                background: selectedGenre === g.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: selectedGenre === g.id ? '#fff' : '#cbd5e1',
                border: selectedGenre === g.id ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                padding: '0.4rem 0.9rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Tombol Roll */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={handleRoll}
            disabled={isRolling}
            style={{
              background: isRolling ? '#475569' : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              color: '#fff',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '999px',
              fontSize: '1.2rem',
              fontWeight: 800,
              cursor: isRolling ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)',
              transform: isRolling ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            {isRolling ? '🎲 Mengundi Anime...' : '✨ PUTAR GACHA SEKARANG ✨'}
          </button>
        </div>
      </div>

      {/* Hasil Gacha */}
      {result && (
        <div className="animate-fade-in" style={{
          background: 'var(--card-bg)',
          border: '2px solid rgba(99, 102, 241, 0.6)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.85rem',
              padding: '0.3rem 1rem',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              🎉 HASIL GACHA KAMU! 🎉
            </span>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '0 0 auto', width: '200px', height: '300px', position: 'relative', borderRadius: '12px', overflow: 'hidden', margin: '0 auto', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}>
              <Image
                src={result.images?.webp?.image_url || '/placeholder.png'}
                alt={result.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                {result.title}
              </h2>
              {result.title_japanese && (
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {result.title_japanese}
                </p>
              )}

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span style={{ background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                  ⭐ Skor: {result.score || 'N/A'}
                </span>
                <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                  📺 {result.episodes ? `${result.episodes} Ep` : 'Ongoing / Movie'}
                </span>
                {result.year && (
                  <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                    📅 {result.year}
                  </span>
                )}
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, maxHeight: '120px', overflowY: 'auto', marginBottom: '1.5rem' }}>
                {result.synopsis ? result.synopsis.slice(0, 250) + '...' : 'Sinopsis tidak tersedia.'}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link
                  href={`/anime/${result.mal_id}`}
                  style={{
                    background: 'var(--primary)',
                    color: '#fff',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Lihat Detail Lengkap &rarr;
                </Link>

                <button
                  onClick={handleShare}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    border: '1px solid var(--card-border)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {copied ? '✅ Link Tersalin!' : '🔗 Bagikan Hasil'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
