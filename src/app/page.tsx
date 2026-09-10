import Link from "next/link";
import Image from "next/image";
import {
  getTrendingMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getKoreanDramas,
  getMediaByProvider,
  getTMDBImageUrl,
  MOVIE_GENRES,
} from "@/libs/movie-api";
import MovieCard from "@/components/Movies/MovieCard";
import StreamingNetworks from "@/components/Movies/StreamingNetworks";
import ContinueWatching from "@/components/Movies/ContinueWatching";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [trending, nowPlaying, drakor, topRated, netflixMovies] = await Promise.all([
    getTrendingMovies("week"),
    getNowPlayingMovies(1),
    getKoreanDramas(1),
    getTopRatedMovies(1),
    getMediaByProvider(8, "movie", 1),
  ]);

  const featured = trending[0] || nowPlaying[0];
  const featuredBackdrop = featured ? getTMDBImageUrl(featured.backdrop_path, "original") : "";

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "5rem" }}>
      {/* Cinevo Hero Spotlight Banner */}
      {featured && (
        <section
          style={{
            position: "relative",
            minHeight: "580px",
            display: "flex",
            alignItems: "center",
            backgroundImage: `radial-gradient(circle at 75% 30%, rgba(99, 102, 241, 0.28) 0%, transparent 60%), linear-gradient(180deg, rgba(8, 9, 14, 0.2) 0%, rgba(8, 9, 14, 0.85) 75%, #08090e 100%), linear-gradient(90deg, #08090e 0%, rgba(8, 9, 14, 0.9) 45%, transparent 100%), url(${featuredBackdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            marginBottom: "2.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div
            className="container"
            style={{
              padding: "4.5rem 1.5rem 3.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxWidth: "780px",
            }}
          >
            {/* Tag Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
              <span
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #d946ef 100%)",
                  color: "#fff",
                  padding: "4px 14px",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  letterSpacing: "0.8px",
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                }}
              >
                🔥 TRENDING HARI INI
              </span>
              <span
                style={{
                  background: "rgba(15, 23, 42, 0.85)",
                  border: "1px solid rgba(251, 191, 36, 0.4)",
                  color: "#fbbf24",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                ⭐ {featured.vote_average?.toFixed(1)} / 10
              </span>
              <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600 }}>
                {featured.release_date?.substring(0, 4)} &bull; Ultra HD &bull; Sub Indo
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: 0,
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
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                maxWidth: "650px",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {featured.overview || "Tonton streaming film bioskop terbaru dengan kualitas jernih Full HD dan subtitle bahasa Indonesia tanpa buffering."}
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <Link
                href={`/movies/watch/${featured.id}`}
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                  color: "#fff",
                  padding: "0.9rem 2.2rem",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "1rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  boxShadow: "0 8px 25px -4px rgba(99, 102, 241, 0.6)",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>▶</span> Nonton Sekarang
              </Link>
              <Link
                href="/populer"
                style={{
                  background: "rgba(15, 23, 42, 0.75)",
                  backdropFilter: "blur(12px)",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "0.9rem 1.8rem",
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🔥 Film Populer Lainnya
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Continue Watching Section */}
      <ContinueWatching />

      {/* Streaming Networks Bar */}
      <StreamingNetworks />

      {/* Quick Genre Pills */}
      <section className="container" style={{ padding: "0 1.5rem 2rem 1.5rem" }}>
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
            scrollbarWidth: "none",
          }}
        >
          {MOVIE_GENRES.map((g) => (
            <Link
              key={g.id}
              href={`/movies/search?genre=${g.id}`}
              style={{
                background: "rgba(30, 41, 59, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                color: "#94a3b8",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              {g.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Sedang Tayang di Bioskop (Now Playing - LK21 Primary Feature) */}
      <section className="container" style={{ padding: "1.5rem 1.5rem 2.5rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🎬 Sedang Tayang di Bioskop
            </h2>
            <p style={{ color: "#94a3b8", margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
              Film layar lebar box office terbaru yang sedang tayang dengan kualitas terbaik.
            </p>
          </div>
          <Link href="/populer" style={{ color: "#818cf8", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none" }}>
            Lihat Semua &rarr;
          </Link>
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

      {/* Drama Korea (K-Drama) Terpopuler & On-Going */}
      <section className="container" style={{ padding: "1.5rem 1.5rem 2.5rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🇰🇷 Drama Korea (Drakor) Terpopuler
            </h2>
            <p style={{ color: "#94a3b8", margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
              Koleksi serial drakor romantis, thriller, dan komedi terfavorit lengkap subtitle Indonesia.
            </p>
          </div>
          <Link href="/movies/search?q=korean" style={{ color: "#818cf8", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none" }}>
            Jelajahi Drakor &rarr;
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {drakor.slice(0, 12).map((drama) => (
            <MovieCard key={drama.id} movie={drama} />
          ))}
        </div>
      </section>

      {/* Trending Box Office Minggu Ini */}
      <section className="container" style={{ padding: "1.5rem 1.5rem 2.5rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🔥 Trending Box Office Minggu Ini
            </h2>
            <p style={{ color: "#94a3b8", margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
              Paling banyak ditonton oleh jutaan penonton di seluruh dunia.
            </p>
          </div>
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

      {/* Netflix Originals & Hits */}
      {netflixMovies && netflixMovies.length > 0 && (
        <section className="container" style={{ padding: "1.5rem 1.5rem 2.5rem 1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                🔴 Koleksi Film & Series Netflix
              </h2>
              <p style={{ color: "#94a3b8", margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
                Film dan serial hits original dari platform Netflix.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {netflixMovies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Top Rated All-Time */}
      <section className="container" style={{ padding: "1.5rem 1.5rem 2.5rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              ⭐ Rating Tertinggi Sepanjang Masa
            </h2>
            <p style={{ color: "#94a3b8", margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
              Film dengan ulasan kritikus dan penonton terbaik (IMDb & TMDB).
            </p>
          </div>
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
  );
}
