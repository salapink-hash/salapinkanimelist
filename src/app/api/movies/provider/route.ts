import { NextResponse } from "next/server";
import { getMediaByProvider } from "@/libs/movie-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const providerId = parseInt(searchParams.get("provider") || "8", 10);
  const mediaType = (searchParams.get("type") === "tv" ? "tv" : "movie") as "movie" | "tv";

  try {
    const data = await getMediaByProvider(providerId, mediaType);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching provider data:", error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
