import AnimeList from '@/components/AnimeList'
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from '@/libs/api-libs'

export default async function Home() {
  const topAnime = await getAnimeResponse('top/anime', 'limit=8')
  let recommendedAnime = await getNestedAnimeResponse('recommendations/anime', 'entry')
  recommendedAnime = reproduce(recommendedAnime, 4)

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
