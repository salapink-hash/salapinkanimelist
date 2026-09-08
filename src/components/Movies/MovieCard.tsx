import Image from "next/image";
import Link from "next/link";
import { MovieItem, getTMDBImageUrl } from "@/libs/movie-api";

interface MovieCardProps {
  movie: MovieItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = getTMDBImageUrl(movie.poster_path, "w500");
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link
      href={`/movies/watch/${movie.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "12px",
        overflow: "hidden",
        textDecoration: "none",
        color: "#fff",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        position: "relative",
      }}
      className="movie-card"
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "2/3", overflow: "hidden" }}>
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
        />
        
        {/* Rating Badge */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(251, 191, 36, 0.4)",
            color: "#fbbf24",
            padding: "2px 8px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: "3px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          ⭐ {rating}
        </div>

        {/* Quality / HD Badge */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            background: "rgba(99, 102, 241, 0.9)",
            color: "#fff",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.5px",
          }}
        >
          HD
        </div>

        {/* Play hover overlay */}
        <div
          className="play-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px var(--primary)",
              color: "#fff",
              fontSize: "1.2rem",
            }}
          >
            ▶
          </div>
        </div>
      </div>

      <div style={{ padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={movie.title}
        >
          {movie.title}
        </h3>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <span>{year}</span>
          <span style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.75rem" }}>Nonton &rarr;</span>
        </div>
      </div>

      <style>{`
        .movie-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 25px -5px rgba(99, 102, 241, 0.3);
          border-color: rgba(99, 102, 241, 0.6);
        }
        .movie-card:hover .play-overlay {
          opacity: 1;
        }
      `}</style>
    </Link>
  );
}
