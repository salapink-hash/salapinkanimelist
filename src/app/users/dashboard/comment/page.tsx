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

  let comments: any[] = []
  try {
    comments = await prisma.comment.findMany({
      where: { user_email: user.email as string },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Error fetching comments:", error)
  }

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
            <div key={comment.id} className="dashboard-comment-card">
              <Link 
                href={`/anime/${comment.anime_mal_id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>
                    {comment.anime_title}
                  </span>
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
