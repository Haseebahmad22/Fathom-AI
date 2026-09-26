import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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

  let user = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      user = data.user;
    }
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "digest" in err &&
      (err as { digest: string }).digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw err;
    }
    console.error("PlaylistDetail auth check error:", err);
  }

  if (!user) {
    redirect("/login");
  }

  const userMetadata = user.user_metadata || {};
  const name =
    userMetadata.full_name ||
    userMetadata.name ||
    user.email?.split("@")[0] ||
    "User";
  const email = user.email || "";
  const avatarUrl = userMetadata.avatar_url || userMetadata.picture || "";

  return (
    <PlaylistDetailClient
      playlistId={playlistId}
      user={{
        name,
        email,
        avatarUrl,
      }}
    />
  );
}
