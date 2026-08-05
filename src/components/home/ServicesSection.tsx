import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FileSignature,
  GraduationCap,
  Globe2,
  UsersRound,
} from "lucide-react";

import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { marketHref } from "@/lib/routing/routes";

interface ServiceCard {
  title: string;
  eyebrow: string;
  icon: typeof BriefcaseBusiness;
  accent: keyof typeof ACCENT_STYLES;
  pathway: string;
  timeline: string;
  steps: string[];
  note: string;
  href: string;
  cta: string;
}

const ACCENT_STYLES = {
  brand: {
    topBorder: "border-t-brand-500",
    orb: "bg-brand-100 group-hover:bg-brand-200",
    badge: "bg-brand-600 text-white",
    icon: "text-brand-600",
    panel: "bg-brand-50/60 border-brand-100",
    step: "bg-brand-600",
    cta: "text-brand-700",
  },
  rose: {
    topBorder: "border-t-rose-500",
    orb: "bg-rose-100 group-hover:bg-rose-200",
    badge: "bg-rose-600 text-white",
    icon: "text-rose-600",
    panel: "bg-rose-50/60 border-rose-100",
    step: "bg-rose-600",
    cta: "text-rose-700",
  },
  blue: {
    topBorder: "border-t-blue-500",
    orb: "bg-blue-100 group-hover:bg-blue-200",
    badge: "bg-blue-600 text-white",
    icon: "text-blue-600",
    panel: "bg-blue-50/60 border-blue-100",
    step: "bg-blue-600",
    cta: "text-blue-700",
  },
  amber: {
    topBorder: "border-t-amber-500",
    orb: "bg-amber-100 group-hover:bg-amber-200",
    badge: "bg-amber-500 text-amber-950",
    icon: "text-amber-600",
    panel: "bg-amber-50/60 border-amber-100",
    step: "bg-amber-600",
    cta: "text-amber-700",
  },
  teal: {
    topBorder: "border-t-teal-500",
    orb: "bg-teal-100 group-hover:bg-teal-200",
    badge: "bg-teal-600 text-white",
    icon: "text-teal-600",
    panel: "bg-teal-50/60 border-teal-100",
    step: "bg-teal-600",
    cta: "text-teal-700",
  },
  violet: {
    topBorder: "border-t-violet-500",
    orb: "bg-violet-100 group-hover:bg-violet-200",
    badge: "bg-violet-600 text-white",
    icon: "text-violet-600",
    panel: "bg-violet-50/60 border-violet-100",
    step: "bg-violet-600",
    cta: "text-violet-700",
  },
} as const;

const SERVICES: ServiceCard[] = [
  {
    title: "Skilled Immigration",
    eyebrow: "EE · 189",
    icon: BriefcaseBusiness,
    accent: "brand",
    pathway: "EE · 189",
    timeline: "6–14 months",
    steps: [
      "Profile & CRS / points assessment",
      "Program matching — EE / PNP / 189 / 190",
      "Document preparation & submission",
      "Invitation & decision",
    ],
    note: "The most direct route from qualification to a long-term future.",
    href: "/visas/canada/express-entry",
    cta: "Assess your profile",
  },
  {
    title: "Family & Spouse",
    eyebrow: "Sponsorship",
    icon: UsersRound,
    accent: "rose",
    pathway: "Spousal / Partner",
    timeline: "8–16 months",
    steps: [
      "Relationship evidence review",
      "Sponsorship application filed",
      "Dependants & medicals included",
      "Sponsorship approved",
    ],
    note: "A family-first route, built around the facts of the relationship.",
    href: "/visas/canada/family-sponsorship-parent-grandparent-program",
    cta: "Explore service",
  },
  {
    title: "Study Abroad",
    eyebrow: "Study Permit",
    icon: GraduationCap,
    accent: "blue",
    pathway: "Study Permit + PGWP",
    timeline: "3–6 months",
    steps: [
      "Program & DLI selection",
      "Financial proof & offer letter",
      "Study permit application filed",
      "Enrolment confirmed",
    ],
    note: "World-class education paired with a clear post-study pathway.",
    href: "/study-abroad/canada-student-visas",
    cta: "Explore service",
  },
  {
    title: "Business & Investment",
    eyebrow: "RBI · CBI",
    icon: Building2,
    accent: "amber",
    pathway: "RBI / CBI",
    timeline: "4–18 months",
    steps: [
      "Investment structuring & strategy",
      "Due diligence & source-of-funds",
      "Application filed with authority",
      "Guidance to final decision",
    ],
    note: "A structured route for founders and investors going global.",
    href: "/business-investment/golden-visa-uae",
    cta: "Explore service",
  },
  {
    title: "Visit & Visitor Visas",
    eyebrow: "Visit Visas",
    icon: Globe2,
    accent: "teal",
    pathway: "Tourist / Business / Super Visa",
    timeline: "Varies by destination",
    steps: [
      "Destination & purpose mapping",
      "Evidence preparation",
      "Application & biometrics",
      "Interview preparation where required",
    ],
    note: "One team across five destinations, so your plans do not wait on country switching.",
    href: "/visit-visas",
    cta: "Explore destinations",
  },
  {
    title: "Resume Marketing",
    eyebrow: "CV · LinkedIn",
    icon: FileSignature,
    accent: "violet",
    pathway: "Global job search",
    timeline: "2–6 weeks",
    steps: [
      "Profile & target-market review",
      "Resume & LinkedIn alignment",
      "Employer-facing package",
      "Interview preparation support",
    ],
    note: "A polished profile that gets you noticed by the right employers.",
    href: "/services/resume-marketing",
    cta: "Explore service",
  },
];

export function ServicesSection({ market }: { market: Market }) {
  return (
    <section id="services" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow="Immigration expertise"
          title="A pathway for every ambition"
          lede={`Every case starts with a different professional history, family structure and objective. Here is what the journey typically looks like for each — supported end to end by our ${MARKET_LABELS[market]} office.`}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const styles = ACCENT_STYLES[service.accent];
            return (
              <article
                key={service.title}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl"
              >
                <div
                  className={`relative overflow-hidden border-b border-slate-100 border-t-4 bg-white p-6 ${styles.topBorder}`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute -right-8 -top-10 h-32 w-32 rounded-full blur-2xl transition-colors duration-300 ${styles.orb}`}
                  />
                  <div className="relative mb-5 flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${styles.badge}`}
                    >
                      {service.eyebrow}
                    </span>
                    <Icon aria-hidden="true" className={`size-5 transition-transform duration-300 group-hover:scale-110 ${styles.icon}`} />
                  </div>
                  <h3 className="relative font-display text-xl font-extrabold text-ink">
                    {service.title}
                  </h3>
                  <p className="relative mt-1 mb-5 text-sm text-slate-500">
                    {service.title === "Visit & Visitor Visas"
                      ? "Experts in Canada · Australia · UK · NZ · USA"
                      : service.title === "Resume Marketing"
                        ? "CV writing, job postings & LinkedIn optimization"
                        : service.title === "Business & Investment"
                          ? "Residency & citizenship by investment"
                          : service.title === "Study Abroad"
                            ? "Course, DLI & study-permit guidance"
                            : service.title === "Family & Spouse"
                              ? "Spousal, partner & dependant sponsorship"
                              : "Express Entry, PNP & points-tested visas"}
                  </p>
                  <div className="relative grid grid-cols-2 gap-3">
                    <div
                      className={`rounded-xl border px-4 py-3 ${styles.panel}`}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Pathway
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-ink">{service.pathway}</p>
                    </div>
                    <div
                      className={`rounded-xl border px-4 py-3 ${styles.panel}`}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Timeline
                      </p>
                      <p className="mt-1.5 text-lg font-extrabold leading-none text-ink">
                        {service.timeline}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Typical Steps
                  </p>
                  <div className="space-y-2.5">
                    {service.steps.map((step) => (
                      <div key={step} className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className={`grid size-5 shrink-0 place-items-center rounded-full text-[8px] text-white ${styles.step}`}
                        >
                          <i className="fa-solid fa-check" />
                        </span>
                        <span className="text-sm text-slate-600">{step}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                    &ldquo;{service.note}&rdquo;
                  </p>
                  <a
                    href={marketHref(market, service.href)}
                    className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${styles.cta}`}
                  >
                    {service.cta}
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="fade-up mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400">Also offered:</span>
          <a
            href={marketHref(market, "/visit-visas")}
            className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700"
          >
            Visit &amp; Visitor Visas
          </a>
          <a
            href={marketHref(market, "/services/resume-marketing")}
            className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700"
          >
            Global Job Search
          </a>
        </div>
      </div>
    </section>
  );
}
