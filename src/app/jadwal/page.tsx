'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Dashboard/Header'

const DAYS = [
  { key: 'monday', label: 'Senin' },
  { key: 'tuesday', label: 'Selasa' },
  { key: 'wednesday', label: 'Rabu' },
  { key: 'thursday', label: 'Kamis' },
  { key: 'friday', label: 'Jumat' },
  { key: 'saturday', label: 'Sabtu' },
  { key: 'sunday', label: 'Minggu' },
]

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState('monday')
  const [scheduleData, setScheduleData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/v1/schedules?day=${activeDay}`)
        const data = await res.json()
        setScheduleData(data?.data || [])
      } catch (err) {
        console.error(err)
        setScheduleData([])
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [activeDay])

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '85vh' }}>
      <Header title="📅 Jadwal Rilis Anime Mingguan" />
      <p style={{ color: '#94a3b8', margin: '0.5rem 0 2rem 0', fontSize: '1rem' }}>
        Pantau jadwal tayang episode anime terbaru yang sedang rilis (ongoing) setiap harinya dari Senin sampai Minggu.
      </p>

      {/* Tabs Hari */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '2rem'
      }}>
        {DAYS.map((d) => (
          <button
            key={d.key}
            onClick={() => setActiveDay(d.key)}
            style={{
              background: activeDay === d.key ? 'var(--primary)' : 'var(--card-bg)',
              color: activeDay === d.key ? '#fff' : '#cbd5e1',
              border: activeDay === d.key ? '1px solid var(--primary)' : '1px solid var(--card-border)',
              padding: '0.6rem 1.5rem',
              borderRadius: '999px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* List Jadwal Anime */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8', fontSize: '1.1rem' }}>
          ⏳ Memuat jadwal anime hari ini...
        </div>
      ) : scheduleData.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
          Tidak ada data jadwal rilis untuk hari ini.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {scheduleData.map((anime: any) => (
            <Link
              key={anime.mal_id}
              href={`/anime/${anime.mal_id}`}
              className="dashboard-collection-card"
              style={{
                background: 'var(--card-bg)',
                textDecoration: 'none',
                color: '#fff',
                aspectRatio: 'auto',
                height: '320px'
              }}
            >
              <Image
                src={anime.images?.webp?.image_url || anime.images?.jpg?.image_url || '/placeholder.png'}
                alt={anime.title}
                fill
                style={{ objectFit: 'cover' }}
              />

              <div style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#fbbf24',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 800,
                backdropFilter: 'blur(4px)'
              }}>
                ⭐ {anime.score || '-'}
              </div>

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(15, 17, 26, 0.95) 0%, rgba(15, 17, 26, 0.7) 60%, transparent 100%)',
                padding: '2rem 1rem 1rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  {anime.title}
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>
                  🕒 {anime.broadcast?.string || 'Tayang Reguler'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
