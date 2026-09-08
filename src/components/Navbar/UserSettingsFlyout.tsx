"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface UserSettingsFlyoutProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function UserSettingsFlyout({ user }: UserSettingsFlyoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [subtitleLang, setSubtitleLang] = useState<"id" | "en">("id");
  const [qualityMode, setQualityMode] = useState<"1080p" | "720p">("1080p");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);

  // Open on mouse enter
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  // Delay close slightly so user can smoothly move mouse into the panel
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 280);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={flyoutRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      {/* Trigger Gear / Avatar Icon Button with Red Dot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        suppressHydrationWarning
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: isOpen ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.07)",
          border: isOpen ? "1.5px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.12)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isOpen ? "0 0 15px rgba(168, 85, 247, 0.5)" : "none",
        }}
        title="Settings & Akun"
      >
        {user?.image ? (
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden" }}>
            <Image src={user.image} alt={user.name || "User"} width={32} height={32} style={{ objectFit: "cover" }} />
          </div>
        ) : (
          <span style={{ fontSize: "1.2rem" }}>⚙️</span>
        )}

        {/* Red Notification Dot like Cinevo */}
        <span
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#ef4444",
            boxShadow: "0 0 8px #ef4444",
          }}
        />
      </button>

      {/* Flyout Dropdown Panel (Exact Cinevo Style) */}
      {isOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: "0",
            width: "330px",
            background: "rgba(11, 14, 22, 0.97)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "1.4rem",
            boxShadow: "0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.15)",
            zIndex: 300,
            color: "#fff",
          }}
        >
          {/* Section: Settings Header */}
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.2rem 0", color: "#fff" }}>
              Settings
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0 }}>
              {user ? `Halo, ${user.name || user.email}` : "Sign in to access your account"}
            </p>
          </div>

          {/* Section: Auth Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {user ? (
              <>
                <Link
                  href="/users/dashboard"
                  style={{
                    background: "rgba(99, 102, 241, 0.15)",
                    border: "1.5px solid #6366f1",
                    color: "#fff",
                    padding: "0.7rem 1rem",
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    textDecoration: "none",
                    boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
                  }}
                  className="flyout-btn"
                >
                  <span>📊</span>
                  <span>Dashboard &amp; Koleksi</span>
                </Link>

                <Link
                  href="/api/auth/signout"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#f87171",
                    padding: "0.65rem 1rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    textDecoration: "none",
                  }}
                  className="flyout-btn"
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </Link>
              </>
            ) : (
              <>
                {/* Sign In Button with Purple Glow Border */}
                <Link
                  href="/api/auth/signin"
                  style={{
                    background: "rgba(99, 102, 241, 0.12)",
                    border: "1.5px solid #a855f7",
                    color: "#fff",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "14px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    textDecoration: "none",
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.35)",
                    transition: "all 0.2s",
                  }}
                  className="flyout-btn"
                >
                  <span style={{ fontSize: "1rem" }}>➜]</span>
                  <span>Sign In</span>
                </Link>

                {/* Create Account Button */}
                <Link
                  href="/api/auth/signin"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#cbd5e1",
                    padding: "0.7rem 1.25rem",
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    textDecoration: "none",
                    position: "relative",
                  }}
                  className="flyout-btn"
                >
                  <span style={{ fontSize: "1rem" }}>👤</span>
                  <span>Create Account</span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "14px",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#ef4444",
                    }}
                  />
                </Link>
              </>
            )}
          </div>

          {/* Section: Preferences */}
          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.2rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Preferences
            </div>

            {/* Subtitle Bahasa */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>🌐 Bahasa Subtitle</span>
                <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700 }}>Otomatis</span>
              </div>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "999px",
                  padding: "3px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "3px",
                }}
              >
                <button
                  onClick={() => setSubtitleLang("id")}
                  suppressHydrationWarning
                  style={{
                    background: subtitleLang === "id" ? "#6366f1" : "transparent",
                    color: subtitleLang === "id" ? "#fff" : "#64748b",
                    border: "none",
                    padding: "0.4rem 0.5rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.3rem",
                    transition: "all 0.2s",
                  }}
                >
                  <span>🇮🇩</span>
                  <span>Indonesia</span>
                </button>
                <button
                  onClick={() => setSubtitleLang("en")}
                  suppressHydrationWarning
                  style={{
                    background: subtitleLang === "en" ? "#6366f1" : "transparent",
                    color: subtitleLang === "en" ? "#fff" : "#64748b",
                    border: "none",
                    padding: "0.4rem 0.5rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.3rem",
                    transition: "all 0.2s",
                  }}
                >
                  <span>🇺🇸</span>
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* Kualitas Streaming */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>🎬 Kualitas Streaming</span>
                <span style={{ fontSize: "0.72rem", color: "#22c55e", fontWeight: 700 }}>Full HD</span>
              </div>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "999px",
                  padding: "3px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "3px",
                }}
              >
                <button
                  onClick={() => setQualityMode("1080p")}
                  suppressHydrationWarning
                  style={{
                    background: qualityMode === "1080p" ? "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" : "transparent",
                    color: qualityMode === "1080p" ? "#fff" : "#64748b",
                    border: "none",
                    padding: "0.4rem 0.5rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.3rem",
                    transition: "all 0.2s",
                  }}
                >
                  <span>✨</span>
                  <span>1080p Ultra HD</span>
                </button>
                <button
                  onClick={() => setQualityMode("720p")}
                  suppressHydrationWarning
                  style={{
                    background: qualityMode === "720p" ? "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" : "transparent",
                    color: qualityMode === "720p" ? "#fff" : "#64748b",
                    border: "none",
                    padding: "0.4rem 0.5rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.3rem",
                    transition: "all 0.2s",
                  }}
                >
                  <span>⚡</span>
                  <span>Hemat Kuota</span>
                </button>
              </div>
            </div>

            {/* Request Film & Kontak */}
            <Link
              href="/contact"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "0.65rem 0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "#cbd5e1",
                marginTop: "0.2rem",
              }}
              className="flyout-btn"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>💬</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>Request Film / Lapor Link</span>
              </div>
              <span style={{ color: "#818cf8", fontSize: "0.8rem" }}>&rarr;</span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .flyout-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.15);
        }
      `}</style>
    </div>
  );
}
