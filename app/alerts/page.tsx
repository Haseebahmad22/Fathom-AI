import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/supabase/server";
import AlertsClient from "./AlertsClient";

export const dynamic = "force-dynamic";

export default async function AlertsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return <AlertsClient user={user} />;
}

