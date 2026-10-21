import type { Metadata } from "next";
import { createClient } from "../../../lib/supabase/server";

export const metadata: Metadata = {
  title: "Panel — protos-os",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Użytkowniku";

  const today = new Date().toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">Dzień dobry, {userName}.</h1>
      <p className="mt-1 text-sm capitalize text-muted-foreground">{today}</p>
    </div>
  );
}
