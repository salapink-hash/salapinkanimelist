"use client";

import { useState } from "react";

interface MoviePlayerProps {
  tmdbId: number | string;
  title: string;
}

interface ServerOption {
  id: string;
  name: string;
  badge: string;
  getUrl: (id: string | number) => string;
  description: string;
}

const SERVERS: ServerOption[] = [
  {
    id: "vidlink",
    name: "Server VIP 1 (VidLink)",
    badge: "Fast / HD / Subtitle",
    getUrl: (id) => `https://vidlink.pro/movie/${id}?primaryColor=6366f1&secondaryColor=1e293b&iconColor=ec4899`,
    description: "Server paling stabil dengan subtitle & minim loading.",
  },
  {
    id: "vidsrc-to",
    name: "Server 2 (VidSrc TO)",
    badge: "1080p Ultra HD",
    getUrl: (id) => `https://vidsrc.to/embed/movie/${id}`,
    description: "Kualitas gambar jernih 1080p.",
  },
  {
    id: "embed-su",
    name: "Server 3 (EmbedSU)",
    badge: "Multi Audio & Sub",
    getUrl: (id) => `https://embed.su/embed/movie/${id}`,
    description: "Server cadangan dengan banyak pilihan subtitle.",
  },
  {
    id: "multiembed",
    name: "Server 4 (MultiEmbed)",
    badge: "Direct Stream",
    getUrl: (id) => `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    description: "Server alternatif cepat.",
  },
  {
    id: "vidsrc-xyz",
    name: "Server 5 (VidSrc XYZ)",
    badge: "Backup Server",
    getUrl: (id) => `https://vidsrc.xyz/embed/movie/${id}`,
    description: "Server cadangan darurat.",
  },
];

export default function MoviePlayer({ tmdbId, title }: MoviePlayerProps) {
  const [activeServer, setActiveServer] = useState<string>("vidlink");
  const [isTheater, setIsTheater] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const currentServer = SERVERS.find((s) => s.id === activeServer) || SERVERS[0];
  const streamUrl = currentServer.getUrl(tmdbId);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "2rem",
        position: isTheater ? "relative" : "initial",
        zIndex: isTheater ? 50 : "initial",
      }}
    >
      {/* Theater Mode Overlay */}
      {isTheater && (
        <div
          onClick={() => setIsTheater(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.9)",
            zIndex: 40,
            cursor: "pointer",
          }}
          title="Klik untuk keluar dari Mode Bioskop"
        />
      )}

      {/* Main Video Box */}
      <div
        style={{
          position: isTheater ? "relative" : "relative",
          zIndex: isTheater ? 50 : 1,
          background: "#000",
          borderRadius: isTheater ? "0" : "16px",
          overflow: "hidden",
          border: isTheater ? "none" : "1px solid rgba(99, 102, 241, 0.3)",
          boxShadow: isTheater
            ? "0 20px 50px rgba(0,0,0,0.9)"
            : "0 10px 35px -5px rgba(0, 0, 0, 0.7), 0 0 20px rgba(99, 102, 241, 0.15)",
        }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%", // 16:9 Aspect Ratio
            width: "100%",
            background: "#090a0f",
          }}
        >
          <iframe
            key={`${currentServer.id}-${refreshKey}`}
            src={streamUrl}
            title={`Streaming ${title}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>

        {/* Player Action Control Bar */}
        <div
          style={{
            padding: "0.85rem 1.25rem",
            background: "linear-gradient(180deg, #111827 0%, #0b0f19 100%)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
              }}
            />
            <span style={{ fontSize: "0.85rem", color: "#e2e8f0", fontWeight: 600 }}>
              Aktif: <strong style={{ color: "var(--primary)" }}>{currentServer.name}</strong>
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              onClick={handleRefresh}
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#cbd5e1",
                padding: "0.4rem 0.8rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "all 0.2s",
              }}
              title="Refresh / Muat ulang player"
            >
              🔄 Refresh Player
            </button>

            <button
              onClick={() => setIsTheater(!isTheater)}
              style={{
                background: isTheater ? "var(--primary)" : "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#fff",
                padding: "0.4rem 0.8rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "all 0.2s",
              }}
            >
              {isTheater ? "💡 Matikan Mode Bioskop" : "🍿 Mode Bioskop"}
            </button>
          </div>
        </div>
      </div>

      {/* Server Selection Cards */}
      <div
        style={{
          marginTop: "1.25rem",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: "14px",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            ⚡ Pilih Server Streaming
          </h4>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            *Jika video macet atau error, silakan coba server lain di bawah
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {SERVERS.map((server) => {
            const isSelected = activeServer === server.id;
            return (
              <button
                key={server.id}
                onClick={() => setActiveServer(server.id)}
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(236, 72, 153, 0.25) 100%)"
                    : "rgba(15, 23, 42, 0.6)",
                  border: isSelected
                    ? "1.5px solid var(--primary)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 4px 15px rgba(99, 102, 241, 0.3)" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: isSelected ? "#fff" : "#cbd5e1" }}>
                    {server.name}
                  </span>
                  {isSelected && <span style={{ color: "#22c55e", fontSize: "0.8rem" }}>●</span>}
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: isSelected ? "var(--primary)" : "#94a3b8",
                    fontWeight: 600,
                  }}
                >
                  {server.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
