import prisma from "@/libs/prisma"

export default async function CommentBox({ anime_mal_id }: { anime_mal_id: string }) {
  let comments: any[] = []
  try {
    comments = await prisma.comment.findMany({
      where: { anime_mal_id },
      orderBy: { createdAt: 'desc' }
    })
  } catch (err) {
    console.error("Error fetching comments:", err)
  }

  if (!comments || comments.length === 0) {
    return (
      <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)', textAlign: 'center', color: '#94a3b8' }}>
        Belum ada komentar. Jadilah yang pertama berkomentar!
      </div>
    )
  }

  return (
    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        Komentar ({comments.length})
      </h3>
      
      {comments.map((comment) => (
        <div key={comment.id} style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '8px',
          padding: '1rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{comment.username}</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              {new Date(comment.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.5 }}>
            {comment.comment}
          </p>
        </div>
      ))}
    </div>
  )
}
