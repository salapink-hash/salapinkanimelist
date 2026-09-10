import Link from "next/link";
import { getPopularMovies } from "@/libs/movie-api";
import MovieCard from "@/components/Movies/MovieCard";

export const dynamic = "force-dynamic";

export default async function PopulerPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10) || 1;
  const movies = await getPopularMovies(currentPage);

  return (
    <div className="container animate-fade-in" style={{ padding: "2.5rem 1.5rem 4rem 1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
          paddingBottom: "1.2rem",
          borderBottom: "1px solid var(--card-border)",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            🔥 Film & Drakor Terpopuler
          </h1>
          <p style={{ color: "#94a3b8", margin: "0.3rem 0 0 0", fontSize: "0.95rem" }}>
            Daftar tayangan terpopuler minggu ini yang paling banyak ditonton - Halaman {currentPage}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3rem",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
        {currentPage > 1 && (
          <Link
            href={`/populer?page=${currentPage - 1}`}
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid var(--card-border)",
              color: "#fff",
              padding: "0.6rem 1.4rem",
              borderRadius: "999px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            &larr; Halaman Sebelumnya
          </Link>
        )}
        <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>
          Halaman {currentPage}
        </span>
        <Link
          href={`/populer?page=${currentPage + 1}`}
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
            color: "#fff",
            padding: "0.6rem 1.4rem",
            borderRadius: "999px",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
          }}
        >
          Halaman Berikutnya &rarr;
        </Link>
      </div>
    </div>
  );
}
