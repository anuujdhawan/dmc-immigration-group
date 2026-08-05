import { Mail, MapPin, Phone } from "lucide-react";

import { env } from "@/config/env";
import { NAV_FOOTER, NAV_LEGAL, marketHrefForNav } from "@/config/navigation";
import { getOffice } from "@/config/offices";
import { MARKET_LABELS, type Market } from "@/config/markets";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { marketHref } from "@/lib/routing/routes";

export function SiteFooter({ market }: { market: Market }) {
  const office = getOffice(market);
  return (
    <footer className="dmc-site-footer border-t border-slate-100 bg-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_2fr]">
          <div className="lg:col-span-1">
            <a href={marketHref(market, "/")} aria-label={`${env.SITE_NAME} — home`}>
              <BrandLogo variant="footer" className="mb-4" />
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              RCIC-licensed, MARA-registered and CICC-regulated immigration guidance for
              professionals, families, students, investors and employers across international
              destinations — serving clients in the {MARKET_LABELS[market]} market and beyond.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`tel:${office.phoneE164}`}
                className="flex items-center gap-2 text-slate-500 transition hover:text-brand-700"
              >
                <Phone aria-hidden="true" className="size-3.5 text-brand-600" />
                {office.phoneDisplay}
              </a>
              <a
                href={`mailto:${office.email}`}
                className="flex items-center gap-2 text-slate-500 transition hover:text-brand-700"
              >
                <Mail aria-hidden="true" className="size-3.5 text-brand-600" />
                {office.email}
              </a>
              <p className="flex items-start gap-2 text-slate-500">
                <MapPin aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-brand-600" />
                {office.address}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a
                aria-label="LinkedIn"
                href="#"
                className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-brand-100 hover:text-brand-700"
              >
                <i className="fa-brands fa-linkedin-in text-xs" />
              </a>
              <a
                aria-label="Instagram"
                href="#"
                className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-brand-100 hover:text-brand-700"
              >
                <SocialIcon name="instagram" />
              </a>
              <a
                aria-label="Facebook"
                href="#"
                className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-brand-100 hover:text-brand-700"
              >
                <SocialIcon name="facebook" />
              </a>
              <a
                aria-label="YouTube"
                href="#"
                className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-brand-100 hover:text-brand-700"
              >
                <SocialIcon name="youtube" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {NAV_FOOTER.map((column) => (
              <div key={column.heading}>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {column.heading}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={`${column.heading}:${link.label}:${link.href}`}>
                      <a
                        href={marketHrefForNav(market, link.href)}
                        className="block text-slate-500 transition hover:text-brand-700"
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
        <Container className="flex flex-col gap-3 py-6 text-xs text-slate-400 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} DMC Immigration Group. All rights reserved.</p>
          <p className="max-w-xl text-center leading-relaxed lg:text-left">
            Immigration outcomes are determined by relevant government authorities and cannot be
            guaranteed. RCIC · MARA/OMARA · CICC regulated where applicable.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {NAV_LEGAL.map((link) => (
              <a
                key={`${link.label}:${link.href}`}
                href={link.href}
                className="transition hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
            <a href="/sitemap.xml" className="transition hover:text-brand-700">
              Sitemap
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
