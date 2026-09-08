"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTMDBImageUrl } from "@/libs/movie-api";

interface ContinueItem {
  id: number | string;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average?: number;
  watchedAt: number;
  progress: number;
}

export default function ContinueWatching() {
  const [history, setHistory] = useState<ContinueItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const STORAGE_KEY = "salapink_continue_watching";
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load continue watching list:", e);
    }
  }, []);

  const handleRemove = (e: React.MouseEvent, id: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updated = history.filter((item) => String(item.id) !== String(id));
      setHistory(updated);
      localStorage.setItem("salapink_continue_watching", JSON.stringify(updated));
    } catch (err) {
      console.warn("Error removing continue watching item:", err);
    }
  };

  const handleClearAll = () => {
    try {
      setHistory([]);
      localStorage.removeItem("salapink_continue_watching");
    } catch (err) {
      console.warn("Error clearing continue watching:", err);
    }
  };

  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 5) return "Baru saja";
    if (diffMins < 60) return `${diffMins} mnt lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    return `${diffDays} hari lalu`;
  };

  if (!isMounted || history.length === 0) {
    return null;
  }

  return (
    <section style={{ width: "100%", marginBottom: "1rem" }}>
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#ef4444",
              boxShadow: "0 0 10px #ef4444",
            }}
          />
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Lanjutkan Menonton (Continue Watching)
          </h2>
        </div>

        <button
          onClick={handleClearAll}
          suppressHydrationWarning
          style={{
            background: "transparent",
            border: "none",
            color: "#64748b",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          Bersihkan Riwayat 🗑️
        </button>
      </div>

      {/* Horizontal Carousel Shelf */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          paddingBottom: "1rem",
        }}
      >
        {history.map((item) => {
          const imagePath = item.backdrop_path || item.poster_path;
          const imageUrl = getTMDBImageUrl(imagePath, "w500");

          return (
            <div
              key={item.id}
              style={{
                flex: "0 0 280px",
                position: "relative",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="continue-card"
            >
              <Link
                href={`/movies/watch/${item.id}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                {/* Backdrop / Poster Box */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "155px",
                    background: "#111420",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    sizes="280px"
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    className="continue-img"
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(8,9,14,0.3) 0%, transparent 40%, rgba(8,9,14,0.95) 100%)",
                    }}
                  />

                  {/* Center Play Button Overlay */}
                  <div
                    className="continue-play-btn"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.25s ease",
                      background: "rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "1.2rem",
                        boxShadow: "0 0 20px rgba(99, 102, 241, 0.8)",
                      }}
                    >
                      ▶
                    </div>
                  </div>

                  {/* Top Right: Delete Button */}
                  <button
                    onClick={(e) => handleRemove(e, item.id)}
                    suppressHydrationWarning
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "rgba(10, 12, 20, 0.75)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      zIndex: 10,
                      transition: "all 0.2s",
                    }}
                    title="Hapus dari riwayat"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "#ef4444";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.background = "rgba(10, 12, 20, 0.75)";
                    }}
                  >
                    ✕
                  </button>

                  {/* Bottom: Progress Bar */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.progress}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #6366f1 0%, #f43f5e 100%)",
                        boxShadow: "0 0 8px #f43f5e",
                      }}
                    />
                  </div>
                </div>

                {/* Content Info */}
                <div
                  style={{
                    padding: "0.85rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 800,
                      color: "#fff",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.75rem",
                      color: "#64748b",
                    }}
                  >
                    <span>{formatRelativeTime(item.watchedAt)}</span>
                    <span style={{ color: "#818cf8", fontWeight: 700 }}>Lanjut Nonton &rarr;</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <style>{`
        .continue-card:hover {
          transform: translateY(-5px);
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 14px 28px -5px rgba(99, 102, 241, 0.35);
        }
        .continue-card:hover .continue-img {
          transform: scale(1.05);
        }
        .continue-card:hover .continue-play-btn {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
