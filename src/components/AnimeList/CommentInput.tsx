'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CommentInput({ anime_mal_id, user_email, username, anime_title }: any) {
  const [comment, setComment] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const router = useRouter()

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const handlePosting = async (event: React.MouseEvent) => {
    event.preventDefault()
    
    if (comment.trim() === '') return

    setIsPosting(true)

    const data = { anime_mal_id, user_email, comment, username, anime_title }

    const response = await fetch('/api/v1/comment', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    
    const postComment = await response.json()
    if (postComment.isCreated) {
      setComment('')
      router.refresh()
    } else {
      alert('Gagal mengirim komentar. Pastikan database terhubung.')
    }
    
    setIsPosting(false)
  }

  return (
    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <textarea 
        onChange={handleInput} 
        value={comment}
        style={{
          width: '100%',
          minHeight: '100px',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '8px',
          padding: '1rem',
          color: '#fff',
          fontSize: '1rem',
          resize: 'vertical'
        }}
        placeholder="Tulis komentarmu di sini..."
      />
      <button 
        onClick={handlePosting}
        disabled={isPosting || comment.trim() === ''}
        style={{
          width: 'max-content',
          background: 'var(--primary)',
          color: '#fff',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          fontWeight: 700,
          cursor: isPosting || comment.trim() === '' ? 'not-allowed' : 'pointer',
          opacity: isPosting || comment.trim() === '' ? 0.5 : 1,
          transition: 'var(--transition)'
        }}
      >
        {isPosting ? 'Posting...' : 'Kirim Komentar'}
      </button>
    </div>
  )
}
