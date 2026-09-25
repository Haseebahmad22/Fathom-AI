import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Extract user info from Supabase / Google OAuth user_metadata
  const userMetadata = user.user_metadata || {};
  const name =
    userMetadata.full_name ||
    userMetadata.name ||
    user.email?.split("@")[0] ||
    "User";
  const email = user.email || "";
  const avatarUrl = userMetadata.avatar_url || userMetadata.picture || "";

  return (
    <DashboardClient
      user={{
        name,
        email,
        avatarUrl,
      }}
    />
  );
}
