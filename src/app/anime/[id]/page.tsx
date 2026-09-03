import { getAnimeResponse } from "@/libs/api-libs"
import VideoPlayer from '@/components/Utilities/VideoPlayer'
import Image from 'next/image'
import Link from 'next/link'
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import CommentBox from "@/components/AnimeList/CommentBox"
import CommentInput from "@/components/AnimeList/CommentInput"

export const dynamic = 'force-dynamic'

export default async function AnimeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let data = null
  try {
    const anime = await getAnimeResponse(`anime/${id}`)
    data = anime?.data
  } catch (err) {
    console.error("Error fetching anime:", err)
  }

  if (!data) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
          Data Anime Tidak Ditemukan
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Server API Jikan sedang sibuk / membatasi permintaan, atau anime dengan ID ini tidak tersedia.
        </p>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'var(--primary)',
            color: '#fff',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          &larr; Kembali ke Beranda
        </a>
      </div>
    )
  }

  let user = null
  let collection = null

  try {
    user = await authUserSession()
    if (user && user.email) {
      collection = await prisma.collection.findFirst({
        where: { user_email: user.email, anime_mal_id: id }
      })
    }
  } catch (err) {
    console.error("Error fetching user session/collection:", err)
  }

  const imageUrl = data.images?.webp?.image_url || data.images?.jpg?.image_url || '/placeholder.png'

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
          {data.title}
        </h1>
        <h2 style={{ fontSize: '1.2rem', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
          {data.title_english && data.title_english !== data.title ? data.title_english : data.title_japanese}
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto', width: '100%', maxWidth: '300px' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', border: '1px solid var(--card-border)' }}>
            <Image
              src={imageUrl}
              alt={data.title}
              width={300}
              height={450}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1.5rem' }}>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>SCORE</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>{data.score || '-'}</div>
            </div>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>RANK</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9' }}>#{data.rank || '-'}</div>
            </div>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>EPISODES</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9' }}>{data.episodes || '?'}</div>
            </div>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>STATUS</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f1f5f9' }}>{data.status}</div>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 400px' }}>
          {user && !collection && (
            <CollectionButton 
              anime_mal_id={id} 
              user_email={user.email} 
              anime_image={data.images.webp.image_url} 
              anime_title={data.title} 
            />
          )}
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0', color: '#fff' }}>Synopsis</h3>
          <div style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            color: '#cbd5e1',
            lineHeight: 1.7,
            fontSize: '1rem',
            whiteSpace: 'pre-line'
          }}>
            {data.synopsis ? data.synopsis : 'Synopsis not available.'}
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
             {data.genres?.map((genre: any) => (
                <Link 
                  key={genre.mal_id} 
                  href={`/genre/${genre.mal_id}?name=${encodeURIComponent(genre.name)}`}
                  style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  className="genre-tag"
                >
                  #{genre.name}
                </Link>
             ))}
          </div>

          {/* Widget Belanja Merchandise & Manga */}
          <div style={{
            marginTop: '2rem',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🛍️ Merchandise & Komik {data.title}
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>
              Dukung kreator dengan mengoleksi komik asli, action figure, kaos anime, dan pernak-pernik resmi:
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={`https://shopee.co.id/search?keyword=${encodeURIComponent(data.title + ' merchandise anime figure')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ee4d2d',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                Cari di Shopee 🛒
              </a>
              <a
                href={`https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(data.title + ' anime figure')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#03ac0e',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                Cari di Tokopedia 📦
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--card-border)' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: '0 0 1rem 0' }}>Diskusi Anime</h3>
        <CommentBox anime_mal_id={id} />
        {user ? (
          <CommentInput 
            anime_mal_id={id} 
            user_email={user.email} 
            username={user.name} 
            anime_title={data.title} 
          />
        ) : (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center', color: '#94a3b8' }}>
            Silakan login terlebih dahulu untuk ikut berdiskusi.
          </div>
        )}
      </div>

      {data.trailer?.youtube_id && (
        <VideoPlayer youtubeId={data.trailer.youtube_id} />
      )}
    </div>
  )
}
