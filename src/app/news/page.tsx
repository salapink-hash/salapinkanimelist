import Link from 'next/link'
import Image from 'next/image'
import { articles } from '@/data/newsData'
import Header from '@/components/Dashboard/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berita & Artikel Anime Terbaru - Salapink Animelist',
  description: 'Baca berita, rekomendasi, ulasan, dan panduan anime terbaru dan terpopuler di Salapink Animelist.',
}

export default function NewsPage() {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <Header title="Berita & Artikel Anime" />
      <p style={{ color: '#94a3b8', margin: '0.5rem 0 2rem 0', fontSize: '1rem' }}>
        Kumpulan artikel, rekomendasi, ulasan mendalam, dan informasi terkini seputar dunia anime dan pop culture.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem',
      }}>
        {articles.map((item) => (
          <article 
            key={item.slug} 
            className="dashboard-comment-card" 
            style={{ 
              padding: 0, 
              overflow: 'hidden', 
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                style={{ objectFit: 'cover' }} 
              />
              <span style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'var(--primary)',
                color: '#fff',
                padding: '0.3rem 0.8rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {item.category}
              </span>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                <span>📅 {item.date}</span>
                <span>⏱️ {item.readTime}</span>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                <Link href={`/news/${item.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {item.title}
                </Link>
              </h2>

              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                {item.excerpt}
              </p>

              <Link 
                href={`/news/${item.slug}`}
                style={{
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
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
    </div>
  )
}
