"use client";

import { Activity, BarChart3, CalendarDays, LayoutDashboard, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MOBILE_NAV_ITEMS = [
  { href: "/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/plan", label: "Plan", icon: CalendarDays },
  { href: "/activities", label: "Aktywności", icon: Activity },
  { href: "/goals", label: "Cele", icon: Target },
  { href: "/stats", label: "Statystyki", icon: BarChart3 },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background lg:hidden">
      <ul className="flex">
        {MOBILE_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                data-active={active}
                className="flex flex-col items-center gap-1 py-2.5 text-muted-foreground transition-colors data-[active=true]:text-primary"
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
