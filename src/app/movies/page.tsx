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
    <div className="animate-fade-in" style={{ paddingBottom: "5rem" }}>
      {/* Cinevo Hero Spotlight Banner */}
      {featured && (
        <section
          style={{
            position: "relative",
            minHeight: "560px",
            display: "flex",
            alignItems: "center",
            backgroundImage: `radial-gradient(circle at 75% 30%, rgba(99, 102, 241, 0.25) 0%, transparent 60%), linear-gradient(180deg, rgba(8, 9, 14, 0.2) 0%, rgba(8, 9, 14, 0.8) 75%, #08090e 100%), linear-gradient(90deg, #08090e 0%, rgba(8, 9, 14, 0.85) 45%, transparent 100%), url(${featuredBackdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            marginBottom: "3rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
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
            {/* Cinevo Tag Badge */}
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
                CINEVO SPOTLIGHT
              </span>
              <span
                style={{
                  background: "rgba(15, 23, 42, 0.8)",
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
                {featured.release_date?.substring(0, 4)} &bull; Ultra HD
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                textShadow: "0 4px 30px rgba(0,0,0,0.9)",
              }}
            >
              {featured.title}
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "1.05rem",
                lineHeight: 1.65,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                maxWidth: "640px",
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              {featured.overview || "Tonton keseruan film ini sekarang dengan kualitas Full HD dan pilihan audio & subtitle multi-server."}
            </p>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.75rem" }}>
              <Link
                href={`/movies/watch/${featured.id}`}
                className="glow-btn"
                style={{
                  color: "#fff",
                  padding: "0.9rem 2.25rem",
                  borderRadius: "999px",
                  fontWeight: 800,
                  fontSize: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  letterSpacing: "0.3px",
                }}
              >
                ▶ Watch Now
              </Link>
              
              <div style={{ flex: 1, minWidth: "260px" }}>
                <MovieSearchInput />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {/* Section: Trending Cinema */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "-0.02em" }}>
                🔥 Trending Box Office
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "0.2rem 0 0 0" }}>
                Film paling ramai diperbincangkan minggu ini
              </p>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
              gap: "1.35rem",
            }}
          >
            {trending.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Section: Now In Theaters */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "-0.02em" }}>
                🍿 Sedang Tayang di Bioskop
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "0.2rem 0 0 0" }}>
                Rilisan bioskop terbaru kualitas Full HD
              </p>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
              gap: "1.35rem",
            }}
          >
            {nowPlaying.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Section: Anime Movies & Animation */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "-0.02em" }}>
                ✨ Anime & Animated Movies
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "0.2rem 0 0 0" }}>
                Koleksi film animasi dan anime movie layar lebar
              </p>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
              gap: "1.35rem",
            }}
          >
            {animation.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Section: Top Rated All Time */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "-0.02em" }}>
                🏆 Top Rated Sepanjang Masa
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "0.2rem 0 0 0" }}>
                Mahakarya film dengan ulasan dan rating tertinggi
              </p>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
              gap: "1.35rem",
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
