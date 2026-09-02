import Header from "@/components/Dashboard/Header"
import Image from "next/image"
import Link from "next/link"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import { redirect } from "next/navigation"
import DeleteCollectionButton from "@/components/Dashboard/DeleteCollectionButton"

export default async function Collection() {
  const user = await authUserSession()
  
  if (!user) {
    redirect('/')
  }

  const collection = await prisma.collection.findMany({
    where: { user_email: user.email as string }
  })

  return (
    <section className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <Header title="My Collection" />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {collection.map((item, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <Link 
              href={`/anime/${item.anime_mal_id}`} 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '2/3',
                display: 'block',
                border: '2px solid transparent',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(99, 102, 241, 0.4), 0 10px 10px -5px rgba(99, 102, 241, 0.2)';
                e.currentTarget.style.border = '2px solid rgba(99, 102, 241, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.border = '2px solid transparent';
              }}
            >
              <Image 
                src={item.anime_image || ''} 
                alt={item.anime_title || 'Anime Image'} 
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(15, 17, 26, 1) 0%, rgba(15, 17, 26, 0.7) 50%, transparent 100%)',
                padding: '2rem 1rem 1rem 1rem',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
                <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{item.anime_title}</h5>
              </div>
            </Link>
            
            <DeleteCollectionButton id={item.id} />
          </div>
        ))}
      </div>
    </section>
  )
}
