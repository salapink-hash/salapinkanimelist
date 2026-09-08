"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { MovieItem } from "@/libs/movie-api";
import MovieCard from "@/components/Movies/MovieCard";

interface Provider {
  id: number;
  name: string;
  shortName: string;
  iconBg: string;
  logo: React.ReactNode;
  brandColor: string;
}

const PROVIDERS: Provider[] = [
  {
    id: 8,
    name: "Netflix",
    shortName: "Netflix",
    iconBg: "#000000",
    brandColor: "#E50914",
    logo: (
      <div style={{ color: "#E50914", fontWeight: 900, fontSize: "1.4rem", fontFamily: "Impact, sans-serif", letterSpacing: "1px" }}>
        N
      </div>
    ),
  },
  {
    id: 9,
    name: "Amazon Prime Video",
    shortName: "Prime Video",
    iconBg: "#00A8E1",
    brandColor: "#00A8E1",
    logo: (
      <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.82rem", textAlign: "center", lineHeight: 1.1 }}>
        prime<br /><span style={{ fontSize: "0.75rem", fontWeight: 700 }}>video</span>
      </div>
    ),
  },
  {
    id: 350,
    name: "Apple TV+",
    shortName: "Apple TV",
    iconBg: "#111111",
    brandColor: "#ffffff",
    logo: (
      <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "2px" }}>
         <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>tv</span>
      </div>
    ),
  },
  {
    id: 337,
    name: "Disney+",
    shortName: "Disney+",
    iconBg: "linear-gradient(135deg, #0b1a30 0%, #113ccf 100%)",
    brandColor: "#113ccf",
    logo: (
      <div style={{ color: "#fff", fontWeight: 900, fontSize: "0.95rem", fontStyle: "italic", letterSpacing: "-0.5px" }}>
        Disney<span style={{ fontSize: "1.1rem", color: "#38bdf8" }}>+</span>
      </div>
    ),
  },
  {
    id: 15,
    name: "Hulu",
    shortName: "Hulu",
    iconBg: "#1ce783",
    brandColor: "#1ce783",
    logo: (
      <div style={{ color: "#0b0c0f", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.5px" }}>
        hulu
      </div>
    ),
  },
  {
    id: 1899,
    name: "Max (HBO)",
    shortName: "Max",
    iconBg: "#002be7",
    brandColor: "#002be7",
    logo: (
      <div style={{ color: "#fff", fontWeight: 900, fontSize: "1rem", letterSpacing: "1px" }}>
        MAX
      </div>
    ),
  },
  {
    id: 531,
    name: "Paramount+",
    shortName: "Paramount+",
    iconBg: "#0064ff",
    brandColor: "#0064ff",
    logo: (
      <div style={{ color: "#fff", fontWeight: 900, fontSize: "0.85rem" }}>
        Paramount<span style={{ color: "#93c5fd" }}>+</span>
      </div>
    ),
  },
  {
    id: 283,
    name: "Crunchyroll",
    shortName: "Crunchyroll",
    iconBg: "#f47521",
    brandColor: "#f47521",
    logo: (
      <div style={{ color: "#fff", fontWeight: 900, fontSize: "1.1rem" }}>
        CR
      </div>
    ),
  },
];

interface StreamingNetworksProps {
  initialMovies?: MovieItem[];
}

export default function StreamingNetworks({ initialMovies = [] }: StreamingNetworksProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider>(PROVIDERS[0]);
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const [items, setItems] = useState<MovieItem[]>(initialMovies);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    fetch(`/api/movies/provider?provider=${selectedProvider.id}&type=${mediaType}`)
      .then((res) => res.json())
      .then((json) => {
        if (!isCancelled && json.success && Array.isArray(json.data)) {
          setItems(json.data);
        }
      })
      .catch((err) => console.error("Error fetching provider items:", err))
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedProvider, mediaType]);

  return (
    <section style={{ width: "100%", margin: "1rem 0 3rem 0" }}>
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Active Provider Mini Logo */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: selectedProvider.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 15px ${selectedProvider.brandColor}66`,
              flexShrink: 0,
            }}
          >
            {selectedProvider.logo}
          </div>

          <h2
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Watch {selectedProvider.shortName} {mediaType === "movie" ? "Movies" : "Series"}
          </h2>
        </div>

        {/* Movies / Series Switcher Toggle */}
        <div
          style={{
            background: "rgba(13, 16, 26, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "999px",
            padding: "3px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setMediaType("movie")}
            suppressHydrationWarning
            style={{
              background: mediaType === "movie" ? "rgba(255, 255, 255, 0.12)" : "transparent",
              color: mediaType === "movie" ? "#fff" : "#64748b",
              border: "none",
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              fontSize: "0.82rem",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Movies
          </button>
          <button
            onClick={() => setMediaType("tv")}
            suppressHydrationWarning
            style={{
              background: mediaType === "tv" ? "rgba(255, 255, 255, 0.12)" : "transparent",
              color: mediaType === "tv" ? "#fff" : "#64748b",
              border: "none",
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              fontSize: "0.82rem",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Series
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Provider Icon Selector */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          paddingBottom: "1rem",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {PROVIDERS.map((provider) => {
          const isSelected = selectedProvider.id === provider.id;
          return (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(provider)}
              suppressHydrationWarning
              style={{
                flex: "0 0 auto",
                width: "90px",
                height: "68px",
                borderRadius: "14px",
                background: "rgba(13, 16, 26, 0.8)",
                border: isSelected
                  ? "2px solid #a855f7"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: isSelected
                  ? "0 0 20px rgba(168, 85, 247, 0.4), inset 0 0 10px rgba(168, 85, 247, 0.2)"
                  : "none",
                transform: isSelected ? "scale(1.05)" : "scale(1)",
              }}
              title={provider.name}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  background: provider.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                }}
              >
                {provider.logo}
              </div>
            </button>
          );
        })}
      </div>

      {/* Grid of Filtered Movies/Series */}
      <div style={{ marginTop: "1rem", position: "relative", minHeight: "280px" }}>
        {isLoading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
              gap: "1.35rem",
              opacity: 0.5,
            }}
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  aspectRatio: "2/3",
                  background: "rgba(255, 255, 255, 0.04)",
                  borderRadius: "14px",
                  animation: "pulse 1.5s infinite ease-in-out",
                }}
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1.5rem",
              background: "var(--card-bg)",
              borderRadius: "16px",
              border: "1px solid var(--card-border)",
              color: "#94a3b8",
            }}
          >
            Tidak ada film yang ditemukan untuk platform ini saat ini.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
              gap: "1.35rem",
            }}
          >
            {items.slice(0, 12).map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
