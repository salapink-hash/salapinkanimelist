import AnimeList from '@/components/AnimeList'

export default async function SearchPage({ params }: { params: Promise<{ keyword: string }> }) {
  const { keyword } = await params
  
  // URL decode the keyword (e.g., 'One%20Piece' -> 'One Piece')
  const decodedKeyword = decodeURI(keyword)

  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${decodedKeyword}`)
  const searchAnime = await response.json()

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
