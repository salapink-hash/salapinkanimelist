import Link from "next/link";
import styles from "./Navbar.module.css";
import SearchInput from "./SearchInput";
import UserActionButton from "./UserActionButton";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        {/* Top Row: Logo on left, Search & Profile on right */}
        <div className={styles.topBar}>
          <Link href="/" className={styles.logo}>
            Salapink<span className="text-gradient">Animelist</span>
          </Link>

          {/* Right Tools (Search + Settings Avatar) */}
          <div className={styles.rightTools}>
            <SearchInput />
            <UserActionButton />
          </div>
        </div>

        {/* Navigation Row (Smooth scrollable pills on mobile) */}
        <nav className={styles.navScrollRow}>
          <Link href="/" className={styles.navLink}>
            🏠 Beranda
          </Link>
          <Link
            href="/movies"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              color: "#fff",
              fontSize: "0.88rem",
              fontWeight: 800,
              textDecoration: "none",
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              boxShadow: "0 2px 10px rgba(99, 102, 241, 0.4)",
              whiteSpace: "nowrap",
            }}
          >
            🎬 Cinema
          </Link>
          <Link
            href="/gacha"
            style={{
              color: "var(--primary)",
              fontSize: "0.88rem",
              fontWeight: 700,
              textDecoration: "none",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              background: "rgba(99, 102, 241, 0.12)",
              whiteSpace: "nowrap",
            }}
          >
            🎲 Gacha
          </Link>
          <Link href="/jadwal" className={styles.navLink}>
            📅 Jadwal
          </Link>
          <Link href="/populer" className={styles.navLink}>
            🔥 Populer
          </Link>
          <Link href="/news" className={styles.navLink}>
            📰 Berita
          </Link>
        </nav>
      </div>
    </header>
  );
}
