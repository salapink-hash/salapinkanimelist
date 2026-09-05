import AnimeList from '@/components/AnimeList'
import Link from 'next/link'
import Image from 'next/image'
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from '@/libs/api-libs'
import { articles } from '@/data/newsData'

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

  const featuredArticles = articles.slice(0, 3)

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
            Eksplorasi ribuan anime, putar gacha anime acak, pantau jadwal rilis mingguan, baca ulasan mendalam, dan simpan koleksi tontonanmu.
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

      {/* Top Anime Section */}
      <section className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
        <AnimeList title="Paling Populer" api={topAnime} />
      </section>

      {/* Featured Editorial News Section (Crucial for AdSense) */}
      <section className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              📰 Ulasan & Panduan Pilihan
            </h2>
            <p style={{ color: '#94a3b8', margin: '0.3rem 0 0 0', fontSize: '0.95rem' }}>
              Artikel original, panduan nonton, dan kupas tuntas alur anime dari redaksi Salapink.
            </p>
          </div>
          <Link 
            href="/news" 
            style={{ 
              color: 'var(--primary)', 
              fontWeight: 700, 
              fontSize: '0.95rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            Lihat Semua Artikel &rarr;
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {featuredArticles.map((item) => (
            <article 
              key={item.slug}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
                <span style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  background: 'var(--primary)',
                  color: '#fff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {item.category}
                </span>
              </div>
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <span>📅 {item.date}</span> &bull; <span>⏱️ {item.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                  <Link href={`/news/${item.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.title}
                  </Link>
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                  {item.excerpt}
                </p>
                <Link 
                  href={`/news/${item.slug}`}
                  style={{
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: 'auto'
                  }}
                >
                  Baca Selengkapnya &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      {/* Recommended Section */}
      <section className="container animate-fade-in" style={{ padding: '1rem 1.5rem 4rem 1.5rem' }}>
        <AnimeList title="Rekomendasi Pilihan" api={recommendedAnime} hideViewAll={true} />
      </section>
    </>
  )
}
