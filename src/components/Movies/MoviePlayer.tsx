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
    badge: "⚡ Fast / 1080p / Subtitle",
    getUrl: (id) => `https://vidlink.pro/movie/${id}?primaryColor=6366f1&secondaryColor=131722&iconColor=f43f5e`,
    description: "Server paling stabil dengan subtitle & minim buffer.",
  },
  {
    id: "vidsrc-to",
    name: "Server 2 (VidSrc TO)",
    badge: "🎬 Full HD 1080p",
    getUrl: (id) => `https://vidsrc.to/embed/movie/${id}`,
    description: "Kualitas gambar jernih 1080p.",
  },
  {
    id: "embed-su",
    name: "Server 3 (EmbedSU)",
    badge: "🌐 Multi Sub & Audio",
    getUrl: (id) => `https://embed.su/embed/movie/${id}`,
    description: "Pilihan subtitle terlengkap.",
  },
  {
    id: "multiembed",
    name: "Server 4 (MultiEmbed)",
    badge: "⚡ Direct Stream",
    getUrl: (id) => `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    description: "Server alternatif cepat.",
  },
  {
    id: "vidsrc-xyz",
    name: "Server 5 (VidSrc XYZ)",
    badge: "🛡️ Backup Server",
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
        marginBottom: "2.5rem",
        position: isTheater ? "relative" : "initial",
        zIndex: isTheater ? 50 : "initial",
      }}
    >
      {/* Theater Mode Dimmer Overlay */}
      {isTheater && (
        <div
          onClick={() => setIsTheater(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4, 5, 8, 0.95)",
            backdropFilter: "blur(8px)",
            zIndex: 40,
            cursor: "pointer",
          }}
          title="Klik di mana saja untuk keluar dari Mode Bioskop"
        />
      )}

      {/* Main Video Box with Cinevo Ambient Glow */}
      <div
        style={{
          position: "relative",
          zIndex: isTheater ? 50 : 1,
        }}
      >
        {/* Ambient Glow behind player */}
        <div
          style={{
            position: "absolute",
            inset: "-10px",
            background: "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.25) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 80%)",
            filter: "blur(25px)",
            zIndex: -1,
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            background: "#000",
            borderRadius: isTheater ? "0" : "18px",
            overflow: "hidden",
            border: isTheater ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: isTheater
              ? "0 25px 60px rgba(0,0,0,0.95)"
              : "0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.18)",
          }}
        >
          {/* Iframe 16:9 */}
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%", // 16:9
              width: "100%",
              background: "#08090d",
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

          {/* Player Toolbar */}
          <div
            style={{
              padding: "0.9rem 1.4rem",
              background: "linear-gradient(180deg, #101420 0%, #090c14 100%)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 12px #10b981",
                }}
              />
              <span style={{ fontSize: "0.85rem", color: "#cbd5e1", fontWeight: 600 }}>
                Server: <strong style={{ color: "#818cf8" }}>{currentServer.name}</strong>
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
              <button
                onClick={handleRefresh}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#cbd5e1",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "all 0.2s",
                }}
                title="Muat ulang pemutar video"
              >
                🔄 Reload
              </button>

              <button
                onClick={() => setIsTheater(!isTheater)}
                style={{
                  background: isTheater
                    ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                    : "rgba(255, 255, 255, 0.06)",
                  border: isTheater ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#fff",
                  padding: "0.45rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "all 0.2s",
                  boxShadow: isTheater ? "0 0 15px rgba(99, 102, 241, 0.5)" : "none",
                }}
              >
                {isTheater ? "💡 Matikan Bioskop" : "🍿 Mode Bioskop"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cinevo Server Selection Pills */}
      <div
        style={{
          marginTop: "1.25rem",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: "16px",
          padding: "1.25rem 1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "0.2px" }}>
            ⚡ PILIH SERVER STREAMING
          </h4>
          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
            *Ganti server jika pemutaran video lambat atau buffering
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "0.85rem",
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
                    ? "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(244, 63, 94, 0.2) 100%)"
                    : "rgba(13, 16, 26, 0.7)",
                  border: isSelected
                    ? "1.5px solid #6366f1"
                    : "1px solid rgba(255, 255, 255, 0.07)",
                  borderRadius: "12px",
                  padding: "0.85rem 1rem",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isSelected ? "0 4px 20px rgba(99, 102, 241, 0.35)" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.88rem", color: isSelected ? "#fff" : "#cbd5e1" }}>
                    {server.name}
                  </span>
                  {isSelected && (
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#10b981",
                        boxShadow: "0 0 8px #10b981",
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: isSelected ? "#a5b4fc" : "#64748b",
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
