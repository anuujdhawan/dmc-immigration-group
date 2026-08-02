import { Mail, Phone } from "lucide-react";

import { env } from "@/config/env";
import { getOffice } from "@/config/offices";
import { marketHref } from "@/lib/routing/routes";
import type { Market } from "@/config/markets";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MegaNavigation } from "@/components/layout/MegaNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { MarketSwitcher } from "@/components/layout/MarketSwitcher";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";

const socialLinks = [
  { label: "Instagram", href: env.SOCIAL_INSTAGRAM_URL, name: "instagram" as const },
  { label: "Facebook", href: env.SOCIAL_FACEBOOK_URL, name: "facebook" as const },
  { label: "YouTube", href: env.SOCIAL_YOUTUBE_URL, name: "youtube" as const },
];

export function SiteHeader({ market }: { market: Market }) {
  const office = getOffice(market);
  return (
    <header className="sticky top-0 z-40">
      <div className="hidden bg-brand-950 text-white md:block">
        <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-5 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${office.phoneE164}`}
              className="flex items-center gap-1.5 font-medium hover:text-leaf-soft"
            >
              <Phone aria-hidden="true" className="size-3.5" />
              {office.phoneDisplay}
            </a>
            <a
              href={`mailto:${office.email}`}
              className="flex items-center gap-1.5 hover:text-leaf-soft"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              {office.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-brand-200">RCIC · MARA · CICC Regulated</p>
            <div className="flex items-center gap-2">
              {socialLinks
                .filter((link) => link.href)
                .map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-brand-200 transition-colors hover:text-leaf-soft"
                  >
                    <SocialIcon name={link.name} />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
          <a href={marketHref(market, "/")} aria-label={`${env.SITE_NAME} — ${office.label}`}>
            <BrandLogo variant="header" priority />
          </a>

          <MegaNavigation market={market} />

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block">
              <MarketSwitcher market={market} />
            </div>
            <Button
              href={marketHref(market, "/contact")}
              size="sm"
              className="max-sm:hidden"
            >
              Book Consultation
            </Button>
            <MobileNavigation market={market} />
          </div>
        </div>
      </div>
    </header>
  );
}
