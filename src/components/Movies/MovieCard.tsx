import Image from "next/image";
import Link from "next/link";
import { MovieItem, getTMDBImageUrl } from "@/libs/movie-api";

interface MovieCardProps {
  movie: MovieItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = getTMDBImageUrl(movie.poster_path, "w500");
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "2025";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "7.5";

  return (
    <Link
      href={`/movies/watch/${movie.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "14px",
        overflow: "hidden",
        textDecoration: "none",
        color: "#fff",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
      }}
      className="cinevo-card"
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "2/3", overflow: "hidden", background: "#111420" }}>
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 18vw"
          style={{ objectFit: "cover", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="poster-img"
        />

        {/* Ambient Top Shadow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(8,9,14,0.7) 0%, transparent 35%, transparent 65%, rgba(8,9,14,0.9) 100%)",
            pointerEvents: "none",
          }}
        />
        
        {/* Rating Badge */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "rgba(10, 12, 20, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(251, 191, 36, 0.4)",
            color: "#fbbf24",
            padding: "3px 8px",
            borderRadius: "8px",
            fontSize: "0.72rem",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: "3px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          <span>★</span> {rating}
        </div>

        {/* HD / 4K Badge */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            color: "#fff",
            padding: "3px 7px",
            borderRadius: "6px",
            fontSize: "0.68rem",
            fontWeight: 800,
            letterSpacing: "0.5px",
            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.4)",
          }}
        >
          HD
        </div>

        {/* Year Pill bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(6px)",
            color: "#94a3b8",
            padding: "2px 7px",
            borderRadius: "6px",
            fontSize: "0.7rem",
            fontWeight: 700,
          }}
        >
          {year}
        </div>

        {/* Play Overlay Button */}
        <div
          className="play-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8, 9, 14, 0.45)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.25s ease",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.7)",
              color: "#fff",
              fontSize: "1.25rem",
              transform: "scale(0.85)",
              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="play-icon"
          >
            ▶
          </div>
        </div>
      </div>

      <div style={{ padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
        <h3
          style={{
            fontSize: "0.92rem",
            fontWeight: 700,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "-0.01em",
            color: "#f1f5f9",
          }}
          title={movie.title}
        >
          {movie.title}
        </h3>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "#64748b" }}>
          <span>Movie</span>
          <span style={{ color: "#818cf8", fontWeight: 700 }}>Nonton &rarr;</span>
        </div>
      </div>

      <style>{`
        .cinevo-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 30px -8px rgba(99, 102, 241, 0.35), 0 0 0 1px rgba(99, 102, 241, 0.5);
          border-color: rgba(99, 102, 241, 0.6);
        }
        .cinevo-card:hover .poster-img {
          transform: scale(1.06);
        }
        .cinevo-card:hover .play-overlay {
          opacity: 1;
        }
        .cinevo-card:hover .play-icon {
          transform: scale(1);
        }
      `}</style>
    </Link>
  );
}
