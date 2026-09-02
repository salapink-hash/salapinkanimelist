import styles from './Pagination.module.css'

interface PaginationProps {
  page: number
  lastPage: number
  setPage: (page: number | ((prev: number) => number)) => void
}

export default function Pagination({ page, lastPage, setPage }: PaginationProps) {
  const handleNextPage = () => {
    if (page < lastPage) {
      setPage((prevState) => prevState + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className={styles.button}
      >
        &larr; Prev
      </button>

      <div className={styles.info}>
        <span className={styles.highlight}>{page}</span> of {lastPage}
      </div>

      <button
        onClick={handleNextPage}
        disabled={page === lastPage}
        className={styles.button}
      >
        Next &rarr;
      </button>
    </div>
  )
}
