import { authUserSession } from "@/libs/auth-libs"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await authUserSession()
  
  if (!user) {
    redirect('/')
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '2rem' }}>WELCOME, {user.name?.toUpperCase()}</h3>
      
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        padding: '2rem',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        minWidth: '300px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--primary)', width: '150px', height: '150px' }}>
          <Image 
            src={user.image || ''}
            alt="..." 
            width={150} 
            height={150}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: '0 0 0.5rem 0' }}>{user.name}</h4>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>{user.email}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link 
          href="/users/dashboard/collection"
          style={{
            background: 'var(--primary)',
            color: '#fff',
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: 600,
            transition: 'var(--transition)'
          }}
        >
          My Collection
        </Link>
        <Link 
          href="/users/dashboard/comment"
          style={{
            background: 'var(--card-bg)',
            color: '#fff',
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: 600,
            border: '1px solid var(--card-border)',
            transition: 'var(--transition)'
          }}
        >
          My Comments
        </Link>
      </div>
    </div>
  )
}
