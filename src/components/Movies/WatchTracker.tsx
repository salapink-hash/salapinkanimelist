"use client";

import { useEffect } from "react";
import { MovieDetail } from "@/libs/movie-api";

interface WatchTrackerProps {
  movie: {
    id: number | string;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average?: number;
  };
}

export default function WatchTracker({ movie }: WatchTrackerProps) {
  useEffect(() => {
    if (!movie || !movie.id) return;

    try {
      const STORAGE_KEY = "salapink_continue_watching";
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      let list: any[] = existingRaw ? JSON.parse(existingRaw) : [];

      // Filter out the current item if it exists already
      list = list.filter((item) => String(item.id) !== String(movie.id));

      // Add to front of list
      list.unshift({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average || 0,
        watchedAt: Date.now(),
        progress: Math.floor(Math.random() * 40) + 30, // simulated progress 30-70% for visual polish
      });

      // Keep max 15 items
      list = list.slice(0, 15);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn("Could not save to continue watching:", e);
    }
  }, [movie]);

  return null;
}
