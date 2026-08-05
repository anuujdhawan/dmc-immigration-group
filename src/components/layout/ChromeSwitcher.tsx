"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { isLandingPagePath } from "@/config/landing-pages";

/**
 * Renders the distraction-free landing chrome on landing routes and the normal
 * site chrome everywhere else. Both variants are pre-rendered server-side and
 * passed in as props; only the branch matching the current pathname is rendered.
 */
export function ChromeSwitcher({
  standard,
  landing,
}: {
  standard: ReactNode;
  landing: ReactNode;
}) {
  const pathname = usePathname();
  return isLandingPagePath(pathname) ? <>{landing}</> : <>{standard}</>;
}
