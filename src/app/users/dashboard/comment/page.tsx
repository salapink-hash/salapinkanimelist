import Header from "@/components/Dashboard/Header"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"
import DeleteCommentButton from "@/components/Dashboard/DeleteCommentButton"

export default async function CommentPage() {
  const user = await authUserSession()
  
  if (!user) {
    redirect('/')
  }

  const comments = await prisma.comment.findMany({
    where: { user_email: user.email as string },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <section className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <Header title="My Comments" />
      
      {comments.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '3rem' }}>
          Kamu belum pernah memberikan komentar apapun.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '8px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = 'var(--card-border)';
            }}
            >
              <Link 
                href={`/anime/${comment.anime_mal_id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  >{comment.anime_title}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {new Date(comment.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.5 }}>
                  "{comment.comment}"
                </p>
              </Link>
              <DeleteCommentButton id={comment.id} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
