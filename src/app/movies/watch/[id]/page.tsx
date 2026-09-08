import Image from "next/image";
import Link from "next/link";
import { getMovieDetail, getTMDBImageUrl } from "@/libs/movie-api";
import MoviePlayer from "@/components/Movies/MoviePlayer";
import MovieCard from "@/components/Movies/MovieCard";

export const dynamic = "force-dynamic";

export default async function WatchMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetail(id);

  if (!movie || !movie.title) {
    return (
      <div
        className="container animate-fade-in"
        style={{ padding: "5rem 1.5rem", textAlign: "center", minHeight: "60vh" }}
      >
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
          Film Tidak Ditemukan
        </h2>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          Film dengan ID {id} tidak ditemukan di database TMDB atau server sedang sibuk.
        </p>
        <Link
          href="/movies"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.75rem",
            background: "var(--primary)",
            color: "#fff",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          &larr; Kembali ke Katalog Film
        </Link>
      </div>
    );
  }

  const posterUrl = getTMDBImageUrl(movie.poster_path, "w500");
  const backdropUrl = getTMDBImageUrl(movie.backdrop_path, "original");
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : "-";
  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
  const minutes = movie.runtime ? movie.runtime % 60 : 0;
  const formattedDuration = hours > 0 ? `${hours}j ${minutes}m` : movie.runtime ? `${minutes}m` : "-";

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
      {/* Background Ambience */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "600px",
          backgroundImage: `radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 70%), url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.18,
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "1.5rem" }}>
        {/* Navigation Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            color: "#94a3b8",
            marginBottom: "1.25rem",
          }}
        >
          <Link href="/" style={{ color: "#cbd5e1" }}>
            Beranda
          </Link>
          <span>/</span>
          <Link href="/movies" style={{ color: "#cbd5e1" }}>
            Cinema
          </Link>
          <span>/</span>
          <span style={{ color: "var(--primary)", fontWeight: 600 }}>{movie.title}</span>
        </div>

        {/* Streaming Video Player Section */}
        <MoviePlayer tmdbId={id} title={movie.title} />

        {/* Movie Info & Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem",
            marginTop: "2.5rem",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            padding: "2rem",
          }}
        >
          {/* Left: Poster & Quick Stats */}
          <div style={{ maxWidth: "260px", width: "100%", margin: "0 auto" }}>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 15px 30px rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Image
                src={posterUrl}
                alt={movie.title}
                width={260}
                height={390}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
                marginTop: "1.25rem",
              }}
            >
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid var(--card-border)",
                  padding: "0.6rem",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>TMDB RATING</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fbbf24" }}>
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "-"}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid var(--card-border)",
                  padding: "0.6rem",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>DURASI</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9" }}>
                  ⏱️ {formattedDuration}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid var(--card-border)",
                  padding: "0.6rem",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>TAHUN</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9" }}>
                  📅 {releaseYear}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid var(--card-border)",
                  padding: "0.6rem",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>STATUS</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#38bdf8" }}>
                  {movie.status || "Released"}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Synopsis, Genres, Cast */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", flex: 1 }}>
            <div>
              <h1
                className="text-gradient"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                  fontWeight: 900,
                  margin: "0 0 0.4rem 0",
                  lineHeight: 1.2,
                }}
              >
                {movie.title}
              </h1>
              {movie.tagline && (
                <p style={{ fontStyle: "italic", color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Genre Pills */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  style={{
                    background: "rgba(99, 102, 241, 0.15)",
                    color: "var(--primary)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "999px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  #{genre.name}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
                Sinopsis
              </h3>
              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {movie.overview || "Sinopsis tidak tersedia untuk film ini."}
              </p>
            </div>

            {/* Top Cast / Pemeran */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
                  Pemeran Utama
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "0.85rem",
                    overflowX: "auto",
                    paddingBottom: "0.5rem",
                  }}
                >
                  {movie.credits.cast.slice(0, 8).map((actor) => (
                    <div
                      key={actor.id}
                      style={{
                        flex: "0 0 100px",
                        textAlign: "center",
                        background: "rgba(15, 23, 42, 0.6)",
                        padding: "0.5rem",
                        borderRadius: "10px",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          margin: "0 auto 0.4rem auto",
                          background: "#1e293b",
                        }}
                      >
                        {actor.profile_path ? (
                          <Image
                            src={getTMDBImageUrl(actor.profile_path, "w300")}
                            alt={actor.name}
                            width={60}
                            height={60}
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#64748b",
                              fontSize: "1.2rem",
                            }}
                          >
                            👤
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#fff",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {actor.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.65rem",
                          color: "#94a3b8",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {actor.character}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar / Rekomendasi Film */}
        {((movie.recommendations?.results && movie.recommendations.results.length > 0) ||
          (movie.similar?.results && movie.similar.results.length > 0)) && (
          <section style={{ marginTop: "3.5rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🍿 Rekomendasi Film Serupa
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {(movie.recommendations?.results || movie.similar?.results || [])
                .slice(0, 6)
                .map((item) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
