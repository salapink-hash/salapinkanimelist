'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteCommentButton({ id }: { id: number }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!window.confirm("Yakin ingin menghapus komentar ini?")) return

    setIsDeleting(true)
    const response = await fetch(`/api/v1/comment`, {
      method: "DELETE",
      body: JSON.stringify({ id })
    })

    const result = await response.json()
    if (result.isDeleted) {
      router.refresh()
    } else {
      setIsDeleting(false)
      alert('Gagal menghapus komentar')
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        background: 'rgba(239, 68, 68, 0.1)',
        color: 'rgb(239, 68, 68)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '6px',
        padding: '0.4rem 0.8rem',
        fontSize: '0.8rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: isDeleting ? 'not-allowed' : 'pointer',
        opacity: isDeleting ? 0.5 : 1,
        transition: 'all 0.2s',
        marginTop: '1rem',
        marginLeft: 'auto'
      }}
      title="Hapus Komentar"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
      {isDeleting ? 'Menghapus...' : 'Hapus'}
    </button>
  )
}
