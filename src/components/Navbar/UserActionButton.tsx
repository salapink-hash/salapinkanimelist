import Link from "next/link"
import { authUserSession } from "@/libs/auth-libs"

export default async function UserActionButton() {
  const user = await authUserSession()
  const actionLabel = user ? "Sign Out" : "Sign In"
  const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {user && (
        <Link 
          href="/users/dashboard"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '6px'
          }}
        >
          Dashboard
        </Link>
      )}
      <Link 
        href={actionURL}
        style={{
          color: 'var(--primary)',
          backgroundColor: '#fff',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 700,
          padding: '0.5rem 1.25rem',
          borderRadius: '999px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {actionLabel}
      </Link>
    </div>
  )
}
