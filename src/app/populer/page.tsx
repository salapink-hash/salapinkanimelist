'use client'

import React, { useEffect, useState } from 'react'
import AnimeList from '@/components/AnimeList'
import HeaderMenu from '@/components/AnimeList/HeaderMenu'
import Pagination from '@/components/Utilities/Pagination'

export default function Page() {
  const [page, setPage] = useState(1)
  const [topAnime, setTopAnime] = useState<any>([])

  const fetchDataAnime = async () => {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
    const data = await response.json()
    setTopAnime(data)
  }

  useEffect(() => {
    fetchDataAnime()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <div className="container animate-fade-in">
      <HeaderMenu title={`ANIME TERPOPULER PAGE ${page}`} />
      <AnimeList title="" api={topAnime} hideViewAll={true} />
      <Pagination
        page={page}
        lastPage={topAnime?.pagination?.last_visible_page}
        setPage={setPage}
      />
    </div>
  )
}
