'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteCollectionButton({ id }: { id: number }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!window.confirm("Yakin ingin menghapus anime ini dari koleksimu?")) return

    setIsDeleting(true)
    const response = await fetch(`/api/v1/collection`, {
      method: "DELETE",
      body: JSON.stringify({ id })
    })

    const result = await response.json()
    if (result.isDeleted) {
      router.refresh()
    } else {
      setIsDeleting(false)
      alert('Gagal menghapus data')
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(239, 68, 68, 0.8)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDeleting ? 'not-allowed' : 'pointer',
        opacity: isDeleting ? 0.5 : 1,
        backdropFilter: 'blur(4px)',
        transition: 'transform 0.2s, background 0.2s',
        zIndex: 10
      }}
      title="Hapus dari Koleksi"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
    </button>
  )
}
