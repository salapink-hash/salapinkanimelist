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

  let collection: any[] = []
  try {
    collection = await prisma.collection.findMany({
      where: { user_email: user.email as string }
    })
  } catch (error) {
    console.error("Error fetching collection:", error)
  }

  return (
    <section className="container animate-fade-in" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <Header title="My Collection" />
      
      {collection.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '3rem' }}>
          Kamu belum memiliki koleksi anime apapun.
        </div>
      ) : (
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
                className="dashboard-collection-card"
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
      )}
    </section>
  )
}
