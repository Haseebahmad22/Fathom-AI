import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/supabase/server";
import PlaylistsClient from "./PlaylistsClient";

export const dynamic = "force-dynamic";

export default async function PlaylistsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return <PlaylistsClient user={user} />;
}

