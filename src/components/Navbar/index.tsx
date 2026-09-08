"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import SearchInput from "./SearchInput";
import UserActionButton from "./UserActionButton";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Cinevo Top Alert Banner */}
      {showAlert && (
        <div
          style={{
            background: "linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)",
            borderBottom: "1px solid rgba(239, 68, 68, 0.25)",
            padding: "0.5rem 1.5rem",
            fontSize: "0.82rem",
            color: "#fca5a5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            zIndex: 110,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "0 auto" }}>
            <span style={{ fontSize: "0.9rem" }}>🚨</span>
            <span>
              <strong style={{ color: "#fff" }}>Important Update:</strong> Bookmark domain ini untuk akses nonton anime, bioskop & serial TV kualitas HD tanpa hambatan.
            </span>
          </div>
          <button
            onClick={() => setShowAlert(false)}
            suppressHydrationWarning
            style={{
              background: "transparent",
              border: "none",
              color: "#fca5a5",
              cursor: "pointer",
              fontSize: "0.85rem",
              padding: "0.2rem",
            }}
            title="Tutup pengumuman"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <header className={styles.navbar} ref={navRef}>
        <div className={`container ${styles.navContainer}`} style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
                  background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                }}
              >
                🐱
              </span>
              <span style={{ color: "#fff", fontWeight: 900 }}>
                Salapink<span className="text-gradient">Cinevo</span>
              </span>
            </Link>

            {/* Nav Links */}
            <nav style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
              {/* Home */}
              <Link
                href="/"
                style={{
                  color: "#e2e8f0",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "all 0.2s",
                }}
                className="nav-pill"
              >
                🏠 Home
              </Link>

              {/* Movies Mega Dropdown Trigger */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => toggleDropdown("movies")}
                  suppressHydrationWarning
                  style={{
                    background: activeDropdown === "movies" ? "rgba(99, 102, 241, 0.2)" : "transparent",
                    color: activeDropdown === "movies" ? "#fff" : "#cbd5e1",
                    border: activeDropdown === "movies" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    padding: "0.45rem 0.9rem",
                    borderRadius: "999px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    transition: "all 0.2s",
                  }}
                  className="nav-pill"
                >
                  🎬 Movies <span style={{ fontSize: "0.65rem", transform: activeDropdown === "movies" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                </button>

                {/* Movies Mega Dropdown Menu */}
                {activeDropdown === "movies" && (
                  <div
                    className="animate-fade-in"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "0",
                      width: "560px",
                      background: "rgba(10, 13, 22, 0.96)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      padding: "1.5rem",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.15)",
                      zIndex: 200,
                    }}
                  >
                    <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", margin: "0 0 0.3rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        🎬 Movies & Bioskop
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                        Jelajahi ribuan film box office Hollywood, Marvel, Disney, anime movie, dan film bioskop terbaru dengan pilihan server super cepat.
                      </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <Link
                        href="/movies"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.75rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          🚀 Discover Movies <span style={{ background: "#6366f1", color: "#fff", fontSize: "0.62rem", padding: "1px 5px", borderRadius: "4px" }}>NEW</span>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Katalog lengkap & filter per provider</span>
                      </Link>

                      <Link
                        href="/movies"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.75rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          📈 Trending Box Office
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Film paling populer minggu ini</span>
                      </Link>

                      <Link
                        href="/movies"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.75rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          🍿 Now In Theaters
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Rilisan bioskop terkini Full HD</span>
                      </Link>

                      <Link
                        href="/movies"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.75rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          ⭐ Top Rated Films
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Film dengan rating skor tertinggi</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Shows / Series Mega Dropdown Trigger (Exact Cinevo style) */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => toggleDropdown("shows")}
                  suppressHydrationWarning
                  style={{
                    background: activeDropdown === "shows" ? "rgba(99, 102, 241, 0.2)" : "transparent",
                    color: activeDropdown === "shows" ? "#818cf8" : "#cbd5e1",
                    border: activeDropdown === "shows" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    padding: "0.45rem 0.9rem",
                    borderRadius: "999px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    transition: "all 0.2s",
                  }}
                  className="nav-pill"
                >
                  📺 Shows <span style={{ fontSize: "0.65rem", transform: activeDropdown === "shows" ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                </button>

                {/* Shows Mega Dropdown Menu */}
                {activeDropdown === "shows" && (
                  <div
                    className="animate-fade-in"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "-80px",
                      width: "600px",
                      background: "rgba(10, 13, 22, 0.96)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      padding: "1.5rem",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.15)",
                      zIndex: 200,
                    }}
                  >
                    <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", margin: "0 0 0.3rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        📺 Shows & Series
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                        Embark on a journey through the world of TV shows. From the latest hits to timeless classics, discover new stories and revisit your favorites.
                      </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                      <Link
                        href="/movies"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.8rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          🚀 Discover <span style={{ background: "#6366f1", color: "#fff", fontSize: "0.62rem", padding: "1px 5px", borderRadius: "4px" }}>NEW</span>
                        </div>
                        <span style={{ fontSize: "0.74rem", color: "#94a3b8", lineHeight: 1.4 }}>
                          Unearth new TV shows and hidden gems in the vast landscape of television.
                        </span>
                      </Link>

                      <Link
                        href="/populer"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.8rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          📈 Trending
                        </div>
                        <span style={{ fontSize: "0.74rem", color: "#94a3b8", lineHeight: 1.4 }}>
                          Catch up with the world and see what TV shows are currently trending.
                        </span>
                      </Link>

                      <Link
                        href="/"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.8rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          ✨ Anime
                        </div>
                        <span style={{ fontSize: "0.74rem", color: "#94a3b8", lineHeight: 1.4 }}>
                          Explore anime TV shows and ongoing seasonal series.
                        </span>
                      </Link>

                      <Link
                        href="/populer"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.8rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          🤍 Popular
                        </div>
                        <span style={{ fontSize: "0.74rem", color: "#94a3b8", lineHeight: 1.4 }}>
                          Dive into the world of popular TV shows that have captured hearts.
                        </span>
                      </Link>

                      <Link
                        href="/jadwal"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.8rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          ▷ Airing Today
                        </div>
                        <span style={{ fontSize: "0.74rem", color: "#94a3b8", lineHeight: 1.4 }}>
                          Don&apos;t miss out on the latest episodes airing today.
                        </span>
                      </Link>

                      <Link
                        href="/populer"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "0.8rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.2rem",
                        }}
                        className="mega-item"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, fontSize: "0.88rem", color: "#fff" }}>
                          ⭐ Top Rated
                        </div>
                        <span style={{ fontSize: "0.74rem", color: "#94a3b8", lineHeight: 1.4 }}>
                          Explore the pinnacle of television excellence with top-rated series.
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Playables / Gacha Pill */}
              <Link
                href="/gacha"
                style={{
                  color: "#e2e8f0",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "all 0.2s",
                }}
                className="nav-pill"
              >
                🎮 Playables <span style={{ background: "#a855f7", color: "#fff", fontSize: "0.62rem", padding: "1px 5px", borderRadius: "4px" }}>NEW</span>
              </Link>

              {/* Jadwal */}
              <Link
                href="/jadwal"
                style={{
                  color: "#cbd5e1",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "999px",
                  transition: "all 0.2s",
                }}
                className="nav-pill"
              >
                📅 Jadwal
              </Link>

              {/* Berita */}
              <Link
                href="/news"
                style={{
                  color: "#cbd5e1",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "999px",
                  transition: "all 0.2s",
                }}
                className="nav-pill"
              >
                📰 Berita
              </Link>
            </nav>
          </div>

          {/* Right Action Tools */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <SearchInput />
            <UserActionButton />
          </div>
        </div>
      </header>

      <style>{`
        .nav-pill:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
        .mega-item:hover {
          background: rgba(99, 102, 241, 0.12) !important;
          border-color: rgba(99, 102, 241, 0.4) !important;
          transform: translateY(-2px);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
