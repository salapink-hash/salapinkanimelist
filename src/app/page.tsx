import AnimeList from '@/components/AnimeList'
import Link from 'next/link'
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from '@/libs/api-libs'

export default async function Home() {
  const topAnime = await getAnimeResponse('top/anime', 'limit=8')
  
  let recommendedAnime: any = { data: [] }
  try {
    const recommendedData = await getNestedAnimeResponse('recommendations/anime', 'entry')
    if (recommendedData && recommendedData.length > 0) {
      recommendedAnime = reproduce(recommendedData, 4)
    }
  } catch (err) {
    console.error("Failed to load recommendations:", err)
  }

  // Fallback jika Jikan endpoint recommendations sedang 504 / timeout / kosong
  if (!recommendedAnime?.data || recommendedAnime.data.length === 0) {
    const randomPage = Math.floor(Math.random() * 5) + 2
    const fallbackTop = await getAnimeResponse('top/anime', `page=${randomPage}&limit=10`)
    if (fallbackTop?.data && fallbackTop.data.length > 0) {
      recommendedAnime = reproduce(fallbackTop.data, 4)
    } else {
      const fallbackSeason = await getAnimeResponse('seasons/now', 'limit=4')
      recommendedAnime = fallbackSeason || { data: [] }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="container animate-fade-in" style={{ padding: '3rem 1.5rem 1rem 1.5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid var(--card-border)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <span style={{
            background: 'rgba(99, 102, 241, 0.2)',
            color: 'var(--primary)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            padding: '0.35rem 1rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            🔥 Portal Komunitas & Data Anime #1
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '1.25rem 0 0.75rem 0', lineHeight: 1.2 }}>
            Temukan Anime Terbaik di <span className="text-gradient">Salapink Animelist</span>
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto 2rem auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Eksplorasi ribuan anime, putar gacha anime acak, pantau jadwal rilis mingguan, dan simpan koleksi tontonanmu.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/gacha"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                color: '#fff',
                padding: '0.85rem 2rem',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 10px 20px -5px rgba(236, 72, 153, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🎲 Gacha Anime Acak
            </Link>
            <Link
              href="/jadwal"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid var(--card-border)',
                padding: '0.85rem 2rem',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📅 Jadwal Tayang Hari Ini
            </Link>
          </div>
        </div>
      </section>

      <section className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
        <AnimeList title="Paling Populer" api={topAnime} />
      </section>
      
      <section className="container animate-fade-in" style={{ padding: '0 1.5rem 4rem 1.5rem' }}>
        <AnimeList title="Rekomendasi Pilihan" api={recommendedAnime} hideViewAll={true} />
      </section>
    </>
  )
}
