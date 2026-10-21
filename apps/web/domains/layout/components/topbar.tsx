"use client";

import { Bell, Moon, Plus, Search, Sun, Timer } from "lucide-react";
import { Button } from "@protos/ui";
import { useTheme } from "../hooks/use-theme";

export function Topbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      {/* Search trigger */}
      <button
        type="button"
        aria-label="Szukaj (⌘K)"
        disabled
        className="flex flex-1 items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed sm:max-w-xs"
      >
        <Search className="size-3.5 shrink-0" aria-hidden="true" />
        <span className="flex-1 text-left">Szukaj…</span>
        <kbd className="hidden rounded bg-muted px-1 py-0.5 text-[10px] font-mono sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-1">
        {/* Focus Timer placeholder */}
        <button
          type="button"
          aria-label="Focus Timer"
          disabled
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Timer className="size-4" aria-hidden="true" />
        </button>

        {/* Notifications placeholder */}
        <button
          type="button"
          aria-label="Powiadomienia"
          disabled
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Bell className="size-4" aria-hidden="true" />
        </button>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "dark" ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {theme === "dark" ? (
            <Sun className="size-4" aria-hidden="true" />
          ) : (
            <Moon className="size-4" aria-hidden="true" />
          )}
        </button>

        {/* QuickAdd placeholder */}
        <Button size="sm" disabled className="gap-1.5">
          <Plus className="size-4" aria-hidden="true" />
          Dodaj
        </Button>
      </div>
    </header>
  );
}
