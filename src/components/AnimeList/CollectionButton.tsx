'use client'

import React, { useState } from 'react'

export default function CollectionButton({ anime_mal_id, user_email, anime_image, anime_title }: any) {
  const [isCreated, setIsCreated] = useState(false)

  const handleCollection = async (event: React.MouseEvent) => {
    event.preventDefault()
    
    const data = { anime_mal_id, user_email, anime_image, anime_title }

    const response = await fetch('/api/v1/collection', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const collection = await response.json()
    if (collection.isCreated) {
      setIsCreated(true)
    }
  }

  return (
    <>
      {isCreated ? (
        <p style={{ color: 'var(--primary)', fontWeight: 700, margin: '1rem 0' }}>Berhasil ditambahkan ke koleksi</p>
      ) : (
        <button
          onClick={handleCollection}
          style={{
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'var(--transition)',
            margin: '1rem 0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          Add To Collection
        </button>
      )}
    </>
  )
}
