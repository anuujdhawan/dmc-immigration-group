import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type LogoVariant = "header" | "footer" | "mark" | "emblem";

const sources: Record<LogoVariant, { src: string; width: number; height: number; alt: string }> = {
  header: {
    src: "/media/brand/dmc-logo-horizontal.webp",
    width: 320,
    height: 122,
    alt: "DMC Immigration Group",
  },
  footer: {
    src: "/media/brand/dmc-logo-wide.webp",
    width: 320,
    height: 120,
    alt: "DMC Immigration Group",
  },
  mark: {
    src: "/media/brand/dmc-logo-mark.webp",
    width: 256,
    height: 256,
    alt: "DMC Immigration Group",
  },
  emblem: {
    src: "/media/brand/dmc-logo-emblem.webp",
    width: 512,
    height: 512,
    alt: "DMC Immigration Group",
  },
};

const sizeClasses: Record<LogoVariant, string> = {
  header: "h-9 w-auto md:h-10",
  footer: "h-12 w-auto",
  mark: "size-8",
  emblem: "h-16 w-auto md:h-20",
};

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({ variant = "header", className, priority = false }: BrandLogoProps) {
  const source = sources[variant];
  return (
    <Image
      src={source.src}
      alt={source.alt}
      width={source.width}
      height={source.height}
      priority={priority}
      className={cn(sizeClasses[variant], "object-contain", className)}
    />
  );
}
