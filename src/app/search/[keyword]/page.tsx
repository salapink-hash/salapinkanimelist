import { redirect } from "next/navigation";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword } = await params;
  redirect(`/movies/search?q=${encodeURIComponent(keyword)}`);
}
