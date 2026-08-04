import { Mail, MapPin, Phone } from "lucide-react";

import { env } from "@/config/env";
import { NAV_FOOTER, NAV_LEGAL, marketHrefForNav } from "@/config/navigation";
import { getOffice } from "@/config/offices";
import type { Market } from "@/config/markets";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/ui/Container";
import { marketHref } from "@/lib/routing/routes";

export function SiteFooter({ market }: { market: Market }) {
  const office = getOffice(market);
  return (
    <footer className="border-t border-slate-100 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_2fr]">
          <div className="flex flex-col gap-5">
            <a href={marketHref(market, "/")} aria-label={`${env.SITE_NAME} — home`}>
              <BrandLogo variant="footer" />
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              RCIC-licensed, MARA-registered and CICC-regulated immigration guidance for
              professionals, families, students, investors and employers across international
              destinations.
            </p>
            <div className="flex flex-col gap-3 rounded-2xl border border-brand-600/10 bg-brand-50/50 p-5 text-sm">
              <p className="text-xs font-bold uppercase tracking-mega text-brand-600">
                {office.city} Office
              </p>
              <a
                href={`tel:${office.phoneE164}`}
                className="flex items-center gap-2.5 font-semibold text-charcoal hover:text-brand-700"
              >
                <Phone aria-hidden="true" className="size-4 text-brand-600" />
                {office.phoneDisplay}
              </a>
              <a
                href={`mailto:${office.email}`}
                className="flex items-center gap-2.5 text-charcoal hover:text-brand-700"
              >
                <Mail aria-hidden="true" className="size-4 text-brand-600" />
                {office.email}
              </a>
              <p className="flex items-start gap-2.5 text-muted">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                {office.address}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {NAV_FOOTER.map((column) => (
              <div key={column.heading}>
                <p className="mb-4 text-xs font-bold uppercase tracking-mega text-charcoal">
                  {column.heading}
                </p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={marketHrefForNav(market, link.href)}
                        className="text-sm text-muted transition-colors hover:text-brand-700"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-slate-100">
        <Container className="flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} DMC Immigration Group. All rights reserved.
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-slate-500">
            Immigration outcomes are determined by relevant government authorities and cannot be
            guaranteed. RCIC · MARA/OMARA · CICC regulated where applicable.
          </p>
        </Container>
      </div>

      <div className="border-t border-slate-100 bg-slate-50">
        <Container className="flex flex-wrap items-center gap-x-5 gap-y-2 py-4">
          {NAV_LEGAL.map((link) => (
            <a
              key={`${link.label}:${link.href}`}
              href={link.href}
              className="text-xs text-slate-500 transition-colors hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/sitemap.xml"
            className="text-xs text-slate-500 transition-colors hover:text-brand-700"
          >
            Sitemap
          </a>
        </Container>
      </div>
    </footer>
  );
}
