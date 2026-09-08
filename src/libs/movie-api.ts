const TMDB_API_KEY = process.env.TMDB_API_KEY || "844dba0bfd8f3a4f3799f6130ef9e335";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface MovieItem {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  popularity: number;
  media_type?: string;
}

export interface MovieDetail extends MovieItem {
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  genres: { id: number; name: string }[];
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
  similar?: {
    results: MovieItem[];
  };
  recommendations?: {
    results: MovieItem[];
  };
}

export async function getTMDBData(endpoint: string, queryParams: string = "") {
  try {
    const delimiter = endpoint.includes("?") ? "&" : "?";
    const url = `${TMDB_BASE_URL}/${endpoint}${delimiter}api_key=${TMDB_API_KEY}&language=id-ID&include_adult=false${queryParams ? `&${queryParams}` : ""}`;
    
    // Fetch with cache revalidation
    let response = await fetch(url, { next: { revalidate: 60 * 60 * 2 } });
    
    // If id-ID gives empty or error, fallback to en-US
    if (!response.ok) {
      const fallbackUrl = `${TMDB_BASE_URL}/${endpoint}${delimiter}api_key=${TMDB_API_KEY}&language=en-US&include_adult=false${queryParams ? `&${queryParams}` : ""}`;
      response = await fetch(fallbackUrl, { next: { revalidate: 60 * 60 * 2 } });
    }

    if (!response.ok) {
      console.warn(`TMDB API Error (${response.status}) on ${endpoint}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching TMDB endpoint ${endpoint}:`, error);
    return null;
  }
}

// Get Trending Movies
export async function getTrendingMovies(timeWindow: "day" | "week" = "day"): Promise<MovieItem[]> {
  const data = await getTMDBData(`trending/movie/${timeWindow}`);
  return data?.results || [];
}

// Get Popular Movies
export async function getPopularMovies(page: number = 1): Promise<MovieItem[]> {
  const data = await getTMDBData(`movie/popular`, `page=${page}`);
  return data?.results || [];
}

// Get Now Playing in Theaters
export async function getNowPlayingMovies(page: number = 1): Promise<MovieItem[]> {
  const data = await getTMDBData(`movie/now_playing`, `page=${page}`);
  return data?.results || [];
}

// Get Top Rated Movies
export async function getTopRatedMovies(page: number = 1): Promise<MovieItem[]> {
  const data = await getTMDBData(`movie/top_rated`, `page=${page}`);
  return data?.results || [];
}

// Get Anime / Animation Movies
export async function getAnimationMovies(page: number = 1): Promise<MovieItem[]> {
  const data = await getTMDBData(`discover/movie`, `with_genres=16&sort_by=popularity.desc&page=${page}`);
  return data?.results || [];
}

// Search Movies
export async function searchMovies(query: string, page: number = 1): Promise<MovieItem[]> {
  if (!query.trim()) return [];
  const data = await getTMDBData(`search/movie`, `query=${encodeURIComponent(query)}&page=${page}`);
  return data?.results || [];
}

// Get Movies or Series by Streaming Provider (Netflix, Prime, Disney+, Apple TV, etc.)
export async function getMediaByProvider(
  providerId: number,
  mediaType: "movie" | "tv" = "movie",
  page: number = 1
): Promise<MovieItem[]> {
  const endpoint = `discover/${mediaType}`;
  const data = await getTMDBData(
    endpoint,
    `with_watch_providers=${providerId}&watch_region=US&sort_by=popularity.desc&page=${page}`
  );
  
  if (!data?.results) return [];

  // Normalize TV show results (which have 'name' instead of 'title')
  return data.results.map((item: any) => ({
    id: item.id,
    title: item.title || item.name || "Untitled",
    original_title: item.original_title || item.original_name,
    overview: item.overview || "",
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    release_date: item.release_date || item.first_air_date || "",
    vote_average: item.vote_average || 0,
    vote_count: item.vote_count || 0,
    popularity: item.popularity || 0,
    media_type: mediaType,
  }));
}

// Get Movie Details with Credits, Videos, and Similar
export async function getMovieDetail(id: string | number): Promise<MovieDetail | null> {
  const data = await getTMDBData(`movie/${id}`, `append_to_response=videos,credits,similar,recommendations`);
  return data;
}

// Helper to get full TMDB Image URL
export function getTMDBImageUrl(path: string | null | undefined, size: "w500" | "original" | "w780" | "w300" = "w500"): string {
  if (!path) return "/placeholder.png";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
