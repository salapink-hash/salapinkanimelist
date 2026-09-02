'use client'

import React, { useEffect, useState, use } from 'react'
import { useSearchParams } from 'next/navigation'
import AnimeList from '@/components/AnimeList'
import HeaderMenu from '@/components/AnimeList/HeaderMenu'
import Pagination from '@/components/Utilities/Pagination'

export default function GenrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const genreName = searchParams.get('name') || `Genre ID ${id}`

  const [page, setPage] = useState(1)
  const [animeData, setAnimeData] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const fetchGenreAnime = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${id}&page=${page}&order_by=popularity`)
      const data = await response.json()
      setAnimeData(data)
    } catch (err) {
      console.error("Failed to fetch genre anime:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGenreAnime()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page])

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <HeaderMenu title={`ANIME DENGAN GENRE #${genreName.toUpperCase()} (PAGE ${page})`} />
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem auto' }}></div>
          Memuat daftar anime...
        </div>
      ) : animeData?.data && animeData.data.length > 0 ? (
        <>
          <AnimeList title="" api={animeData} hideViewAll={true} />
          <Pagination
            page={page}
            lastPage={animeData?.pagination?.last_visible_page || 1}
            setPage={setPage}
          />
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
          Tidak ada anime yang ditemukan untuk genre ini atau server API sedang sibuk.
        </div>
      )}
    </div>
  )
}
