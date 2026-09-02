import AnimeList from '@/components/AnimeList'

export default async function SearchPage({ params }: { params: Promise<{ keyword: string }> }) {
  const { keyword } = await params
  
  // URL decode the keyword (e.g., 'One%20Piece' -> 'One Piece')
  const decodedKeyword = decodeURI(keyword)

  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${decodedKeyword}`)
  const searchAnime = await response.json()

  // Kalau Jikan API nge-limit IP Vercel (429) atau error, data akan undefined
  if (!searchAnime.data) {
    return (
      <div className="container animate-fade-in" style={{ paddingBottom: '4rem', textAlign: 'center', paddingTop: '2rem' }}>
        <h2>Pencarian untuk: {decodedKeyword}</h2>
        <p style={{ color: '#ef4444', marginTop: '1rem' }}>
          Maaf, server Jikan API sedang membatasi permintaan dari Vercel (Rate Limit). 
          Silakan refresh atau coba lagi dalam beberapa detik.
        </p>
      </div>
    )
  }

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <AnimeList 
        title={`Pencarian untuk: ${decodedKeyword}`} 
        api={searchAnime} 
        hideViewAll={true} 
      />
    </div>
  )
}
