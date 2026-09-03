import { articles } from '@/data/newsData'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return { title: 'Artikel Tidak Ditemukan' }

  return {
    title: `${article.title} - Salapink Animelist`,
    description: article.excerpt,
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <article className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '900px', minHeight: '80vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link 
          href="/news" 
          style={{ 
            color: 'var(--primary)', 
            fontSize: '0.9rem', 
            fontWeight: 600, 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          &larr; Kembali ke Daftar Berita
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span style={{
            background: 'var(--primary)',
            color: '#fff',
            padding: '0.3rem 0.8rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            {article.category}
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>📅 {article.date}</span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>✍️ Oleh {article.author}</span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⏱️ {article.readTime}</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', lineHeight: 1.3, margin: '0 0 1rem 0' }}>
          {article.title}
        </h1>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}>
        <Image 
          src={article.image} 
          alt={article.title} 
          fill 
          style={{ objectFit: 'cover' }} 
          priority
        />
      </div>

      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2.5rem',
        color: '#e2e8f0',
        fontSize: '1.05rem',
        lineHeight: 1.8,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginTop: '2rem', marginBottom: '0.75rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
                {paragraph.replace('### ', '')}
              </h3>
            )
          }
          if (paragraph.startsWith('---')) {
            return <hr key={idx} style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '2rem 0' }} />
          }
          if (paragraph.startsWith('* ')) {
            const listItems = paragraph.split('\n').map((li) => li.replace('* ', ''))
            return (
              <ul key={idx} style={{ paddingLeft: '1.5rem', margin: '1rem 0' }}>
                {listItems.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                ))}
              </ul>
            )
          }
          if (paragraph.startsWith('1. ')) {
            const listItems = paragraph.split('\n').map((li) => li.replace(/^\d+\.\s*/, ''))
            return (
              <ol key={idx} style={{ paddingLeft: '1.5rem', margin: '1rem 0' }}>
                {listItems.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                ))}
              </ol>
            )
          }
          return <p key={idx} style={{ marginBottom: '1.25rem' }}>{paragraph}</p>
        })}
      </div>

      {/* Bagian Artikel Terkait */}
      {related.length > 0 && (
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem' }}>
            Artikel Terkait Lainnya
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {related.map((item) => (
              <Link 
                key={item.slug} 
                href={`/news/${item.slug}`} 
                className="dashboard-comment-card" 
                style={{ padding: '1.25rem', textDecoration: 'none' }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {item.category}
                </span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: '0 0 0.5rem 0' }}>
                  {item.title}
                </h4>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.date}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
