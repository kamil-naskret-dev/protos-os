import { redirect } from "next/navigation";
import { MobileNav } from "../../domains/layout/components/mobile-nav";
import { Sidebar } from "../../domains/layout/components/sidebar";
import { Topbar } from "../../domains/layout/components/topbar";
import { createClient } from "../../lib/supabase/server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userEmail={user.email} userName={userName} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
