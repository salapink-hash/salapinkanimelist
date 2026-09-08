"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MovieSearchInput() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/movies/search?q=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} style={{ position: "relative", width: "100%", maxWidth: "450px" }}>
      <input
        type="text"
        placeholder="Cari film (contoh: Spider-Man, Avengers, Barbie)..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem 3rem 0.75rem 1.25rem",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(99, 102, 241, 0.4)",
          borderRadius: "999px",
          color: "#fff",
          fontSize: "0.9rem",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
      <button
        type="submit"
        style={{
          position: "absolute",
          right: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "var(--primary)",
          border: "none",
          borderRadius: "50%",
          width: "34px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
          fontSize: "0.9rem",
          transition: "background 0.2s",
        }}
        title="Cari Film"
      >
        🔍
      </button>
    </form>
  );
}
