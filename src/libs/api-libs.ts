export const getAnimeResponse = async (resource: string, query?: string) => {
  try {
    const url = query 
      ? `https://api.jikan.moe/v4/${resource}?${query}`
      : `https://api.jikan.moe/v4/${resource}`
      
    const response = await fetch(url, { next: { revalidate: 60 * 15 } })
    if (!response.ok) {
      console.warn(`Jikan API responded with status ${response.status} for ${url}`)
      return null
    }
    const anime = await response.json()
    return anime
  } catch (err) {
    console.error(`Error fetching ${resource}:`, err)
    return null
  }
}

export const getNestedAnimeResponse = async (resource: string, objectProperty: string) => {
  try {
    const response = await getAnimeResponse(resource)
    if (!response?.data || !Array.isArray(response.data)) {
      return []
    }
    return response.data.flatMap((item: any) => item[objectProperty] || [])
  } catch (err) {
    console.error(`Error in getNestedAnimeResponse for ${resource}:`, err)
    return []
  }
}

export const reproduce = (data: any[], gap: number) => {
  if (!data || data.length === 0) return { data: [] }
  if (data.length <= gap) return { data }
  
  // Shuffle acak data agar rekomendasi bervariasi setiap refresh
  const shuffled = [...data].sort(() => 0.5 - Math.random())
  return {
    data: shuffled.slice(0, gap)
  }
}

