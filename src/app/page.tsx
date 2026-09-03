import AnimeList from '@/components/AnimeList'
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
      <section className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
        <AnimeList title="Paling Populer" api={topAnime} />
      </section>
      
      <section className="container animate-fade-in" style={{ padding: '0 1.5rem 4rem 1.5rem' }}>
        <AnimeList title="Rekomendasi" api={recommendedAnime} hideViewAll={true} />
      </section>
    </>
  )
}
