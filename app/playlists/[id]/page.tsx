import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/supabase/server";
import PlaylistDetailClient from "./PlaylistDetailClient";

export const dynamic = "force-dynamic";

interface PlaylistDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlaylistDetailPage({
  params,
}: PlaylistDetailPageProps) {
  const resolvedParams = await params;
  const playlistId = resolvedParams.id;

  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <PlaylistDetailClient
      playlistId={playlistId}
      user={user}
    />
  );
}

