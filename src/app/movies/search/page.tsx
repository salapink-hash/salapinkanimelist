import Link from "next/link";
import { searchMedia, getMoviesByGenre, MOVIE_GENRES, MovieItem } from "@/libs/movie-api";
import MovieCard from "@/components/Movies/MovieCard";
import MovieSearchInput from "@/components/Movies/MovieSearchInput";

export const dynamic = "force-dynamic";

export default async function MovieSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {
  const { q, genre } = await searchParams;
  const keyword = q || "";
  const genreId = genre ? parseInt(genre, 10) : null;

  let results: MovieItem[] = [];
  let pageTitle = "Semua Film";

  if (genreId) {
    const foundGenre = MOVIE_GENRES.find((g) => g.id === genreId);
    pageTitle = foundGenre ? `Genre: ${foundGenre.name}` : `Genre #${genreId}`;
    results = await getMoviesByGenre(genreId);
  } else if (keyword) {
    pageTitle = `Hasil Pencarian: "${keyword}"`;
    results = await searchMedia(keyword);
  }

  return (
    <div className="container animate-fade-in" style={{ padding: "2.5rem 1.5rem 4rem 1.5rem", minHeight: "80vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "2.5rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--card-border)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
            <Link href="/movies" style={{ color: "var(--primary)" }}>
              &larr; Kembali ke Cinema
            </Link>
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", margin: 0 }}>
            {pageTitle}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
            Ditemukan {results.length} judul tayangan
          </p>
        </div>

        <div style={{ width: "100%", maxWidth: "400px" }}>
          <MovieSearchInput />
        </div>
      </div>

      {results.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1.5rem",
            background: "var(--card-bg)",
            borderRadius: "16px",
            border: "1px solid var(--card-border)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
            Tidak ada film atau drakor yang cocok
          </h3>
          <p style={{ color: "#94a3b8", maxWidth: "500px", margin: "0 auto 1.5rem auto" }}>
            Coba gunakan kata kunci bahasa Inggris atau nama judul film yang lebih umum (misal: Spider-Man, Batman, Squid Game, Queen of Tears).
          </p>
          <Link
            href="/movies"
            style={{
              display: "inline-block",
              padding: "0.7rem 1.5rem",
              background: "var(--primary)",
              color: "#fff",
              borderRadius: "999px",
              fontWeight: 700,
            }}
          >
            Lihat Film Trending &rarr;
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
