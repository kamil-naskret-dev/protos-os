"use client";

import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Repeat2,
  Settings,
  Target,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSignOut } from "../../auth/hooks/use-sign-out";
import { BrandLogo } from "../../../components/brand-logo";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/plan", label: "Plan", icon: CalendarDays },
  { href: "/activities", label: "Aktywności", icon: Activity },
  { href: "/goals", label: "Cele", icon: Target },
  { href: "/habits", label: "Nawyki", icon: Repeat2 },
  { href: "/stats", label: "Statystyki", icon: BarChart3 },
  { href: "/finance", label: "Finanse", icon: Wallet },
] as const;

interface SidebarProps {
  userEmail: string | undefined;
  userName: string | undefined;
}

function getInitials(name: string | undefined, email: string | undefined): string {
  if (name) return name.charAt(0).toUpperCase();
  if (email) return email.charAt(0).toUpperCase();
  return "U";
}

export function Sidebar({ userEmail, userName }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useSignOut();
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar-collapsed") === "true";
    } catch {
      return false;
    }
  });

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sidebar-collapsed", String(next));
      } catch {}
      return next;
    });
  }

  const displayName = userName ?? userEmail?.split("@")[0] ?? "Użytkownik";
  const initials = getInitials(userName, userEmail);

  return (
    <aside
      data-collapsed={collapsed}
      className="group/sidebar relative hidden h-screen flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:flex"
      style={{ width: collapsed ? "3.5rem" : "11rem" }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-3">
        {collapsed ? (
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            P
          </div>
        ) : (
          <BrandLogo width={110} height={24} priority />
        )}
      </div>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Rozwiń sidebar" : "Zwiń sidebar"}
        className="absolute -right-3 top-[3.25rem] z-10 flex size-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground"
      >
        {collapsed ? (
          <ChevronRight className="size-3" aria-hidden="true" />
        ) : (
          <ChevronLeft className="size-3" aria-hidden="true" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={collapsed ? label : undefined}
                  data-active={active}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Areas placeholder */}
        {!collapsed && (
          <div className="mt-4">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Obszary
            </p>
            <p className="px-2 text-xs text-muted-foreground/60">Brak obszarów</p>
          </div>
        )}
      </nav>

      {/* Bottom: Settings + User card */}
      <div className="border-t border-sidebar-border px-2 py-2">
        <Link
          href="/settings"
          title={collapsed ? "Ustawienia" : undefined}
          data-active={pathname === "/settings"}
          className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
        >
          <Settings className="size-4 shrink-0" aria-hidden="true" />
          {!collapsed && <span>Ustawienia</span>}
        </Link>

        <div className="mt-1 flex items-center gap-2 rounded-md px-2 py-1.5">
          <div
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background"
            aria-hidden="true"
          >
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-sidebar-foreground">{displayName}</p>
              <p className="truncate text-[10px] text-muted-foreground">{userEmail}</p>
            </div>
          )}
          {!collapsed && (
            <button
              type="button"
              onClick={signOut}
              aria-label="Wyloguj się"
              className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:text-destructive"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
