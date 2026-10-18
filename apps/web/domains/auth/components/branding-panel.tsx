import Image from "next/image";
import { BrandLogo } from "../../../components/brand-logo";
import { BrandingBubbles } from "./branding-bubbles";

export function BrandingPanel() {
  return (
    <div className="relative overflow-hidden bg-foreground flex h-52 items-center justify-center lg:h-auto lg:gap-6 lg:flex-col lg:items-stretch lg:justify-between lg:p-10">
      <BrandingBubbles />

      <div className="relative">
        <BrandLogo width={130} height={33} priority />
      </div>

      <div className="relative hidden space-y-3 lg:block">
        <h2 className="text-3xl font-bold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-primary to-violet bg-clip-text text-transparent">
            Zarządzaj finansami,
          </span>
          <br />
          <span className="text-background">planami i celami.</span>
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-background/70">
          Zarządzaj finansami, planami, aktywnościami i celami w jednym spójnym systemie. Odzyskaj
          kontrolę nad swoim czasem i skup się na tym, co naprawdę ważne.
        </p>
      </div>

      <div className="relative hidden overflow-hidden rounded-xl border border-background/10 shadow-2xl lg:block">
        <Image
          src="/application-view.png"
          alt="ProtosOS - application view"
          width={857}
          height={505}
          sizes="(min-width: 1024px) calc(50vw - 5rem), 0px"
          className="max-h-130 w-full object-cover object-top"
        />
      </div>

      <p className="relative hidden text-xs tracking-wide text-background/50 lg:block">
        Twój osobisty system operacyjny.
      </p>
    </div>
  );
}
