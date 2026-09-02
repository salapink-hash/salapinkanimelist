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
  
  const first = ~~(Math.random() * (data.length - gap) + 1)
  const last = first + gap
  
  return {
    data: data.slice(first, last)
  }
}
