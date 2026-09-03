import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get('genre')

  try {
    // Coba endpoint random/anime terlebih dahulu jika tanpa genre
    if (!genre || genre === '0') {
      const randomPage = Math.floor(Math.random() * 15) + 1
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${randomPage}&limit=20`, {
        next: { revalidate: 60 }
      })
      if (res.ok) {
        const json = await res.json()
        if (json?.data && json.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * json.data.length)
          return NextResponse.json({ status: 200, data: json.data[randomIndex] })
        }
      }
    } else {
      const page = Math.floor(Math.random() * 4) + 1
      const res = await fetch(`https://api.jikan.moe/v4/anime?genres=${genre}&order_by=popularity&page=${page}&limit=20`, {
        next: { revalidate: 60 }
      })
      if (res.ok) {
        const json = await res.json()
        if (json?.data && json.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * json.data.length)
          return NextResponse.json({ status: 200, data: json.data[randomIndex] })
        }
      }
    }

    // Fallback cadangan jika Jikan sibuk
    const fallbackRes = await fetch(`https://api.jikan.moe/v4/top/anime?limit=25`, {
      next: { revalidate: 300 }
    })
    const fallbackJson = await fallbackRes.json()
    if (fallbackJson?.data && fallbackJson.data.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallbackJson.data.length)
      return NextResponse.json({ status: 200, data: fallbackJson.data[randomIndex] })
    }

    return NextResponse.json({ status: 500, message: 'Gagal mengambil data' }, { status: 500 })
  } catch (error) {
    console.error('Error in Gacha API:', error)
    return NextResponse.json({ status: 500, message: 'Server error' }, { status: 500 })
  }
}
