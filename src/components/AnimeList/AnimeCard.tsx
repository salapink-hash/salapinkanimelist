import Image from 'next/image'
import Link from 'next/link'
import styles from './AnimeList.module.css'

interface AnimeCardProps {
  id: number
  title: string
  image: string
  score: number
  year: number | null
  episodes: number | null
}

export default function AnimeCard({ id, title, image, score, year, episodes }: AnimeCardProps) {
  return (
    <Link href={`/anime/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
          className={styles.image}
          priority={false}
        />
        <div className={styles.overlay}></div>
        {score && (
          <div className={styles.score}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {score}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.cardTitle} title={title}>{title}</h3>
        <div className={styles.meta}>
          <span>{year || 'TBA'}</span>
          <span>{episodes ? `${episodes} Eps` : '?' }</span>
        </div>
      </div>
    </Link>
  )
}
