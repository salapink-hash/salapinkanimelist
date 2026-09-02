import Link from 'next/link'
import AnimeCard from './AnimeCard'
import styles from './AnimeList.module.css'

interface AnimeListProps {
  title: string
  api: any
  hideViewAll?: boolean
}

export default function AnimeList({ title, api, hideViewAll = false }: AnimeListProps) {
  return (
    <section>
      <div className={styles.listHeader}>
        <h2 className={styles.title}>{title}</h2>
        {!hideViewAll && (
          <Link href="/populer" className={styles.viewAll}>
            View All &rarr;
          </Link>
        )}
      </div>
      
      <div className={styles.grid}>
        {api?.data?.map((anime: any) => (
          <AnimeCard
            key={anime.mal_id}
            id={anime.mal_id}
            title={anime.title}
            image={anime.images.webp.image_url}
            score={anime.score}
            year={anime.year}
            episodes={anime.episodes}
          />
        ))}
      </div>
    </section>
  )
}
