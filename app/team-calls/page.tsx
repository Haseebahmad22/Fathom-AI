import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/supabase/server";
import TeamCallsClient from "./TeamCallsClient";

export const dynamic = "force-dynamic";

export default async function TeamCallsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return <TeamCallsClient user={user} />;
}

