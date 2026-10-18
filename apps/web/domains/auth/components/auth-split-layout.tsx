import type { ReactNode } from "react";
import { BrandingPanel } from "./branding-panel";

interface AuthSplitLayoutProps {
  children: ReactNode;
}

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-2">
      <BrandingPanel />

      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-background via-background to-violet/[0.06] p-8 sm:items-center">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
