import Image from "next/image";
import Link from "next/link";
import {
  getTrendingMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getAnimationMovies,
  getTMDBImageUrl,
} from "@/libs/movie-api";
import MovieCard from "@/components/Movies/MovieCard";
import MovieSearchInput from "@/components/Movies/MovieSearchInput";

export const dynamic = "force-dynamic";

export default async function MoviesPage() {
  const [trending, nowPlaying, topRated, animation] = await Promise.all([
    getTrendingMovies("week"),
    getNowPlayingMovies(1),
    getTopRatedMovies(1),
    getAnimationMovies(1),
  ]);

  const featured = trending[0] || nowPlaying[0];
  const featuredBackdrop = featured ? getTMDBImageUrl(featured.backdrop_path, "original") : "";

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
      {/* Hero Featured Banner */}
      {featured && (
        <section
          style={{
            position: "relative",
            minHeight: "520px",
            display: "flex",
            alignItems: "center",
            background: `linear-gradient(180deg, rgba(15, 17, 26, 0.4) 0%, rgba(15, 17, 26, 0.95) 100%), url(${featuredBackdrop}) center/cover no-repeat`,
            marginBottom: "3rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div
            className="container"
            style={{
              padding: "4rem 1.5rem 3rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxWidth: "800px",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                }}
              >
                🔥 FEATURED CINEMA
              </span>
              <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.9rem" }}>
                ⭐ {featured.vote_average?.toFixed(1)} / 10
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.15,
                textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              }}
            >
              {featured.title}
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "1rem",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                maxWidth: "650px",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {featured.overview || "Tonton keseruan film ini sekarang dalam kualitas Full HD dengan pilihan server terbaik."}
            </p>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <Link
                href={`/movies/watch/${featured.id}`}
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                  color: "#fff",
                  padding: "0.85rem 2rem",
                  borderRadius: "999px",
                  fontWeight: 800,
                  fontSize: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.5)",
                }}
              >
                ▶ Nonton Sekarang
              </Link>
              
              <div style={{ flex: 1, minWidth: "260px" }}>
                <MovieSearchInput />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {/* Section: Trending Minggu Ini */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🔥 Trending Film Bioskop
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {trending.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Section: Sedang Tayang di Bioskop (Now Playing) */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🍿 Sedang Tayang (Now Playing)
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {nowPlaying.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Section: Anime Movie & Animasi */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              ✨ Anime Movies & Animasi Populer
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {animation.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Section: Top Rated Sepanjang Masa */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🏆 Film Rating Tertinggi (Top Rated)
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {topRated.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
