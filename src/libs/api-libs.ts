export const getAnimeResponse = async (resource: string, query?: string) => {
  const url = query 
    ? `https://api.jikan.moe/v4/${resource}?${query}`
    : `https://api.jikan.moe/v4/${resource}`
    
  const response = await fetch(url)
  const anime = await response.json()
  return anime
}

export const getNestedAnimeResponse = async (resource: string, objectProperty: string) => {
  const response = await getAnimeResponse(resource)
  return response?.data?.flatMap((item: any) => item[objectProperty]) || []
}

export const reproduce = (data: any[], gap: number) => {
  if (!data || data.length === 0) return { data: [] }
  if (data.length <= gap) return { data }
  
  const maxStart = Math.max(0, data.length - gap)
  const first = Math.floor(Math.random() * maxStart)
  const last = first + gap
  
  return {
    data: data.slice(first, last)
  }
}
