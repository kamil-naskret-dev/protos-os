import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  width?: number;
  height?: number;
  priority?: boolean | undefined;
}

export function BrandLogo({ width = 130, height = 28, priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="relative inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Image src="/logo.svg" alt="ProtosOS" width={width} height={height} priority={priority} />
    </Link>
  );
}
