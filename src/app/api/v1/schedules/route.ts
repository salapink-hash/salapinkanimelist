import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const day = searchParams.get('day') || 'monday'

  try {
    const res = await fetch(`https://api.jikan.moe/v4/schedules?filter=${day}&limit=20`, {
      next: { revalidate: 3600 }
    })
    
    if (res.ok) {
      const json = await res.json()
      if (json?.data && json.data.length > 0) {
        return NextResponse.json({ status: 200, data: json.data })
      }
    }

    // Fallback ke seasons/now jika schedules timeout
    const fallback = await fetch('https://api.jikan.moe/v4/seasons/now?limit=20', {
      next: { revalidate: 3600 }
    })
    if (fallback.ok) {
      const fallbackJson = await fallback.json()
      return NextResponse.json({ status: 200, data: fallbackJson?.data || [] })
    }

    return NextResponse.json({ status: 200, data: [] })
  } catch (error) {
    console.error('Error in Schedules API:', error)
    return NextResponse.json({ status: 500, data: [] }, { status: 500 })
  }
}
