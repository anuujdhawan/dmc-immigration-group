import { MARKET_LABELS, type Market } from "@/config/markets";
import { interpolateMarket, paragraphsForMarket } from "@/lib/i18n/market-copy";
import {
  type CardItem,
  type DisclaimerSection,
  type ExtendedPageSection,
  type FactsSection,
  type LeadSection,
  type PageContent,
  type PageSection,
} from "@/content/pages/types";
import { breadcrumbsFor, getPageContent } from "@/content/pages";
import { marketHref } from "@/lib/routing/routes";
import { pageMedia } from "@/config/page-media";
import { cn } from "@/lib/utils/cn";
import { MediaGallerySection } from "@/components/pages/internal/InternalPageTemplate";

import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionNav } from "@/components/pages/SectionNav";

/**
 * Recursively interpolate `{market}` tokens through every string field of a
 * content section so market names resolve dynamically from the URL route.
 */
function deepInterpolate(value: unknown, market: Market): unknown {
  if (typeof value === "string") return interpolateMarket(value, market);
  if (Array.isArray(value)) return value.map((v) => deepInterpolate(v, market));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      out[key] = deepInterpolate(child, market);
    }
    return out;
  }
  return value;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sectionId(section: ExtendedPageSection, index: number): string {
  if (section.kind === "status" || section.kind === "facts" || section.kind === "disclaimer" || section.kind === "lead") {
    return `section-${index}`;
  }
  return section.anchor ?? `${slugify(section.heading) || "section"}-${index}`;
}

function splitTitle(title: string): { first: string; rest: string } {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return { first: title, rest: "" };
  const last = words.pop() ?? "";
  return { first: words.join(" "), rest: last };
}

function SectionHeadingBlock({
  eyebrow,
  heading,
  lede,
  dark,
}: {
  eyebrow: string;
  heading: string;
  lede?: string;
  dark?: boolean;
}) {
  return <SectionHeading eyebrow={eyebrow} title={heading} lede={lede} align="left" dark={dark} />;
}

function BenefitsGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-2xl border border-brand-600/10 bg-white/80 p-4"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700"
          >
            ✓
          </span>
          <span className="text-sm leading-relaxed text-ink/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CardGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <li
          key={`${item.title}-${index}`}
          className="rounded-[26px] border border-brand-600/10 bg-white/85 p-6 shadow-sm"
        >
          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
            {String(index + 1).padStart(2, "0")} · {item.title}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

function CardsGrid({ items }: { items: CardItem[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const external = item.href?.startsWith("http");
        const card = (
          <>
            {item.image ? (
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                {/* Next/Image is not required for the current text-first content cards. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
            {item.label ? (
              <span className="inline-flex w-fit rounded-full bg-brand-100 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-mega text-brand-700">
                {item.label}
              </span>
            ) : null}
            <span className="font-display text-lg font-bold text-charcoal">{item.title}</span>
            {item.body ? <span className="text-sm leading-relaxed whitespace-pre-line text-muted">{item.body}</span> : null}
            {item.href ? (
              <span className="mt-auto pt-3 text-xs font-bold uppercase tracking-wide text-brand-600">
                View →
              </span>
            ) : null}
          </>
        );

        return (
          <li key={`${item.title}-${item.label ?? item.href ?? "card"}`}>
            {item.href ? (
              <a
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-brand-600/10 bg-white/80 p-6 shadow-sm transition-colors hover:border-brand-600/30 hover:bg-brand-50/50"
              >
                {card}
              </a>
            ) : (
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-600/10 bg-white/80 p-6 shadow-sm">
                {card}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function FactsStrip({ section }: { section: FactsSection }) {
  return (
    <aside className="border-b border-brand-600/10 bg-white/90">
      <Container className="grid gap-4 py-5 sm:grid-cols-2 xl:grid-cols-4">
        {section.items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-brand-600/10 bg-brand-50/70 px-5 py-4">
            <span className="block text-[11px] font-bold uppercase tracking-mega text-brand-700">{item.label}</span>
            <strong className="mt-1 block text-sm font-bold text-charcoal">{item.value}</strong>
          </div>
        ))}
      </Container>
    </aside>
  );
}

function SplitSection({ section, tone }: { section: Extract<ExtendedPageSection, { kind: "split" }>; tone: "white" | "slate" | "aurora" }) {
  const reverse = section.reverse ?? false;
  const isHeroSplit = ["services", "overview", "documents"].includes(section.anchor ?? "");
  const cardTone =
    tone === "aurora"
      ? "border-white/10 bg-white/5 text-aurora-text"
      : "border-brand-600/10 bg-white/80 text-charcoal";
  return (
    <div className={cn("grid gap-8 lg:items-center", reverse ? "lg:grid-cols-[0.94fr_1.06fr]" : "lg:grid-cols-[1.06fr_0.94fr]")}>
      <figure className={cn("overflow-hidden rounded-[32px] border shadow-sm", tone === "aurora" ? "border-white/10 bg-white/5" : "border-brand-600/10 bg-slate-100", reverse ? "lg:order-2" : "lg:order-1")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={section.media.src} alt={section.media.alt} className="h-full w-full object-cover" loading="lazy" />
        {section.media.caption ? (
          <figcaption className="border-t border-inherit px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            {section.media.caption}
          </figcaption>
        ) : null}
      </figure>
      <div className={reverse ? "lg:order-1" : "lg:order-2"}>
        {section.eyebrow ? (
          <span className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-mega text-brand-700">
            {section.eyebrow}
          </span>
        ) : null}
        <h3
          className={cn(
            "font-display font-semibold tracking-tight",
            isHeroSplit ? "max-w-3xl text-[clamp(2.45rem,5.4vw,4.8rem)] leading-[0.95]" : "text-3xl md:text-[2.6rem]",
            tone === "aurora" ? "text-aurora-text" : "text-charcoal",
          )}
        >
          {section.heading}
        </h3>
        {section.lede ? <p className={cn("mt-4 text-base leading-relaxed", tone === "aurora" ? "text-aurora-muted" : "text-muted")}>{section.lede}</p> : null}
        {section.paragraphs?.length ? (
          <div className={cn("mt-5 space-y-4 text-sm leading-7", tone === "aurora" ? "text-aurora-muted" : "text-muted")}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
        {section.cards?.length ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {section.cards.map((card) => (
              <div key={card.title} className={cn("rounded-[24px] p-4 shadow-sm", cardTone)}>
                <h4 className={cn("font-display text-base font-bold", tone === "aurora" ? "text-aurora-text" : "text-charcoal")}>{card.title}</h4>
                <p className={cn("mt-2 text-sm leading-relaxed", tone === "aurora" ? "text-aurora-muted" : "text-muted")}>{card.body}</p>
              </div>
            ))}
          </div>
        ) : null}
        {section.bullets?.length ? (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {section.bullets.map((bullet) => (
              <li key={bullet} className={cn("flex items-start gap-3 rounded-2xl p-4 text-sm leading-relaxed shadow-sm", cardTone)}>
                <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function LeadBand({ section }: { section: LeadSection }) {
  return (
    <section className="border-y border-brand-600/10 bg-gradient-to-br from-brand-50 to-white py-16 md:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <header className="space-y-4">
          {section.eyebrow ? <span className="inline-flex font-mono text-[11px] font-bold uppercase tracking-mega text-brand-700">{section.eyebrow}</span> : null}
          <h3 className="font-display text-3xl font-semibold tracking-tight text-charcoal md:text-[2.5rem]">{section.heading}</h3>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-muted">
              {paragraph}
            </p>
          ))}
          {section.note ? <p className="text-xs leading-6 text-muted">{section.note}</p> : null}
        </header>
        <div className="grid gap-4 rounded-[28px] border border-brand-600/10 bg-white/90 p-6 shadow-sm md:grid-cols-2 md:p-8">
          {section.fields.map((field) => (
            <label key={field.label} className="grid gap-2 md:col-span-1">
              <span className="text-[11px] font-bold uppercase tracking-mega text-brand-700">{field.label}</span>
              {field.type === "select" ? (
                <select className="rounded-2xl border border-brand-600/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-brand-600/40" defaultValue="">
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {(field.options ?? []).map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="rounded-2xl border border-brand-600/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-muted focus:border-brand-600/40"
                  placeholder={field.placeholder}
                  type={field.type ?? "text"}
                />
              )}
            </label>
          ))}
          {section.consent ? (
            <label className="md:col-span-2 flex items-start gap-3 rounded-2xl bg-brand-50/70 px-4 py-3 text-xs leading-6 text-muted">
              <input className="mt-1" type="checkbox" />
              <span>{section.consent}</span>
            </label>
          ) : null}
          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <Button href={section.primaryCta.href}>{section.primaryCta.label}</Button>
            {section.secondaryCta ? (
              <Button variant="outline" href={section.secondaryCta.href}>
                {section.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

function DisclaimerBand({ section }: { section: DisclaimerSection }) {
  return (
    <aside className="border-t border-brand-600/10 bg-slate-50 py-6">
      <Container className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <span aria-hidden="true" className="mt-0.5 text-brand-700">i</span>
        <p>
          <strong className="text-charcoal">Important:</strong> {section.body}
        </p>
      </Container>
    </aside>
  );
}

function ProgramsGrid({ items }: { items: PageSection & { kind: "programs" } }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col gap-3 rounded-2xl border border-brand-600/10 bg-white/80 p-6 shadow-sm"
        >
          {item.code ? (
            <span className="inline-flex w-fit rounded-full bg-brand-100 px-3 py-1 font-mono text-xs font-bold uppercase tracking-mega text-brand-700">
              {item.code}
            </span>
          ) : null}
          <div>
            <h3 className="font-display text-lg font-bold text-charcoal">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
          {item.label ? (
            <p className="mt-auto pt-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
              {item.label}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function PanelTable({ section }: { section: PageSection & { kind: "panel" } }) {
  const isCrsPanel = section.anchor === "points-crs";
  const isSkillsGrid = section.anchor === "tools";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[32px] border shadow-sm",
        isSkillsGrid
          ? "border-brand-900/10 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white"
          : "border-brand-600/10 bg-white/85",
      )}
    >
      {isSkillsGrid ? (
        <div className="relative p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <strong className="font-display text-[clamp(4rem,8vw,5.6rem)] leading-none text-brand-100">
              {section.rows[0]?.value?.match(/\d+/)?.[0] ?? "67"}
            </strong>
            <span className="max-w-[12rem] text-right text-[11px] leading-relaxed text-brand-100/70">
              {section.note ? section.note : "Federal Skilled Worker selection-factor threshold out of 100"}
            </span>
          </div>
          <dl className="mt-8 divide-y divide-white/10">
            {section.rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 py-4 text-sm">
                <dt className="text-white/70">{row.label}</dt>
                <dd className="font-semibold text-white">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="p-6 md:p-8">
          {isCrsPanel ? (
            <div className="mb-6 flex flex-col gap-3">
              <span className="inline-flex w-fit rounded-full bg-brand-100 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-mega text-brand-700">
                CRS overview
              </span>
              <p className="max-w-2xl text-sm leading-7 text-muted">
                The Comprehensive Ranking System assigns points to eligible profiles. Scores and invitation criteria vary between rounds, so there is no permanent invitation cut-off.
              </p>
            </div>
          ) : null}
          <dl className="grid gap-3">
            {section.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 rounded-[24px] border border-brand-600/10 bg-white/80 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] sm:items-center sm:gap-6"
              >
                <dt className="text-sm font-bold text-charcoal">{row.label}</dt>
                <dd className="text-sm leading-relaxed text-muted">{row.value}</dd>
              </div>
            ))}
          </dl>
          {section.note ? (
            <p className="mt-5 rounded-[22px] border border-brand-600/10 bg-brand-50/70 px-5 py-4 text-xs leading-relaxed text-muted">
              {section.note}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

function DocumentsChecklist({ section }: { section: PageSection & { kind: "documents" } }) {
  return (
    <div className="rounded-2xl border border-brand-600/10 bg-white/80 p-6 shadow-sm md:p-8">
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {section.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
            <span
              aria-hidden="true"
              className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700"
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      {section.note ? (
        <p className="mt-6 border-t border-brand-600/10 pt-4 text-xs leading-relaxed text-muted">
          {section.note}
        </p>
      ) : null}
    </div>
  );
}

function ProcessSteps({ section, dark }: { section: PageSection & { kind: "process" }; dark?: boolean }) {
  const roadmapLabels = [
    "START",
    "CONNECT",
    "REVIEW",
    "ONBOARD",
    "PREPARE",
    "FILE",
    "SETTLE",
    "MOVE",
  ];
  return (
    <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {section.steps.map((step, index) => (
        <li
          key={step.title}
          className={cn(
            "group relative overflow-hidden rounded-[28px] border p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1",
            dark
              ? "border-white/10 bg-white/5 text-aurora-text"
              : "border-brand-600/10 bg-white/85 text-charcoal",
          )}
        >
          <span
            className={cn(
              "inline-flex rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-mega",
              dark ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700",
            )}
          >
            {String(index + 1).padStart(2, "0")} · {roadmapLabels[index] ?? "STEP"}
          </span>
          <h3 className={cn("mt-4 font-display text-lg font-bold", dark ? "text-aurora-text" : "text-charcoal")}>
            {step.title}
          </h3>
          <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-aurora-muted" : "text-muted")}>
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AccordionItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

function HelpBand({ section }: { section: PageSection & { kind: "help" } }) {
  return (
    <div className="rounded-2xl border border-brand-600/10 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm md:p-10">
      <div className="space-y-4">
        {section.paragraphs.map((p) => (
          <p key={p} className="text-sm leading-relaxed text-muted md:text-base">
            {p}
          </p>
        ))}
        {section.bullets?.length ? (
          <ul className="grid gap-3 pt-2 sm:grid-cols-2">
            {section.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                <span
                  aria-hidden="true"
                  className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700"
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function LinksGrid({ section }: { section: PageSection & { kind: "links" } }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {section.items.map((item) => (
        <li key={item.title}>
          <a
            href={item.path}
            className="group flex h-full flex-col gap-1 rounded-2xl border border-brand-600/10 bg-white/80 p-6 shadow-sm transition-colors hover:border-brand-600/30 hover:bg-brand-50/50"
          >
            <span className="font-display text-lg font-bold text-charcoal group-hover:text-brand-700">
              {item.title}
            </span>
            {item.description ? (
              <span className="text-sm leading-relaxed text-muted">{item.description}</span>
            ) : null}
            <span className="mt-auto pt-3 text-xs font-bold uppercase tracking-wide text-brand-600">
              Read guide →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function StatusBanner({ section }: { section: PageSection & { kind: "status" } }) {
  const warning = section.tone === "warning";
  return (
    <div className="border-b border-amber-600/20 bg-amber-50">
      <Container className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:gap-4">
        <span
          className={cn(
            "w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
            warning ? "bg-amber-200 text-amber-900" : "bg-brand-100 text-brand-700",
          )}
        >
          {section.label}
        </span>
        <p className="text-sm leading-relaxed text-ink/80">{section.body}</p>
      </Container>
    </div>
  );
}

function SectionContent({ section, tone }: { section: ExtendedPageSection; tone: "white" | "slate" | "aurora" }) {
  switch (section.kind) {
    case "status":
      return <StatusBanner section={section} />;
    case "overview":
      return (
        <div className="space-y-4">
          {section.paragraphs.map((p) => (
            <p key={p} className="max-w-3xl text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
      );
    case "eligibility":
    case "requirements":
      return <CardGrid items={section.items} />;
    case "programs":
      return <ProgramsGrid items={section} />;
    case "benefits":
      return <BenefitsGrid items={section.items} />;
    case "documents":
      return <DocumentsChecklist section={section} />;
    case "panel":
      return <PanelTable section={section} />;
    case "process":
      return <ProcessSteps section={section} dark={tone === "aurora"} />;
    case "faq":
      return <FaqList items={section.items} />;
    case "help":
      return <HelpBand section={section} />;
    case "cards":
      return <CardsGrid items={section.items} />;
    case "links":
      return <LinksGrid section={section} />;
    case "split":
      return <SplitSection section={section} tone={tone} />;
    case "lead":
      return <LeadBand section={section} />;
    case "facts":
      return <FactsStrip section={section} />;
    case "disclaimer":
      return <DisclaimerBand section={section} />;
    default:
      return null;
  }
}

function RelatedCards({ page, market }: { page: PageContent; market: Market }) {
  const relatedPages = page.relatedPages ?? [];
  const relatedTools = page.relatedTools ?? [];
  const items: { label: string; href: string }[] = [
    ...relatedPages.map((id) => ({ label: id.split("/").slice(-1)[0].replace(/-/g, " "), href: marketHref(market, `/${id}`) })),
    ...relatedTools.map((id) => ({ label: `${id.split("/").slice(-1)[0].replace(/-/g, " ")} (tool)`, href: marketHref(market, `/${id}`) })),
  ];
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="group flex h-full flex-col gap-1 rounded-2xl border border-brand-600/10 bg-white/80 p-6 shadow-sm transition-colors hover:border-brand-600/30 hover:bg-brand-50/50"
          >
            <span className="font-display text-base font-bold text-charcoal capitalize group-hover:text-brand-700">
              {item.label}
            </span>
            <span className="mt-auto pt-3 text-xs font-bold uppercase tracking-wide text-brand-600">
              View →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Breadcrumbs({ page, market }: { page: PageContent; market: Market }) {
  const crumbs = breadcrumbsFor(page.id);
  return (
    <nav aria-label="Breadcrumb" className="border-b border-brand-600/10 bg-white/90">
      <Container className="flex min-h-12 flex-wrap items-center gap-2 py-2 text-xs text-muted">
        <a href={marketHref(market, "/")} className="transition-colors hover:text-brand-600">
          Home
        </a>
        <span aria-hidden="true">/</span>
        <span>{MARKET_LABELS[market]}</span>
        {crumbs.map((crumb) => {
          const crumbPath = crumb.path.replace(/^\/+/, "");
          const isPage = getPageContent(crumbPath) !== null;
          return (
            <span key={crumb.path} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {isPage ? (
                <a href={marketHref(market, crumb.path)} className="transition-colors hover:text-brand-600">
                  {crumb.label}
                </a>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          );
        })}
        <span aria-hidden="true">/</span>
        <strong className="font-bold text-brand-700">{page.title}</strong>
      </Container>
    </nav>
  );
}

export function ProgramPage({ page, market }: { page: PageContent; market: Market }) {
  const rawContentSections = page.sections.filter((section) => section.kind !== "status" && section.kind !== "facts");
  const statusSections = page.sections.filter((section) => section.kind === "status");
  const { first, rest } = splitTitle(page.heroTitle ?? page.title);
  const marketLabel = MARKET_LABELS[market];
  const heroSectionId = `hero-${page.id.replace(/[^a-z0-9]+/gi, "-")}`;
  const media = pageMedia(page.id);
  const hasSplitContent = rawContentSections.some((section) => section.kind === "split");
  const leadImage = media.split && !hasSplitContent ? media.split : undefined;

  // Resolve market tokens through every content string, and add a single
  // market context line to the FIRST overview or lead section only — so the
  // market is named in the page copy without repeating the same sentence.
  const firstContextIndex = rawContentSections.findIndex(
    (section) => section.kind === "overview" || section.kind === "lead",
  );
  const contentSections: ExtendedPageSection[] = rawContentSections.map((section, index) => {
    const resolved = deepInterpolate(section, market) as ExtendedPageSection;
    if (index === firstContextIndex && (resolved.kind === "overview" || resolved.kind === "lead")) {
      resolved.paragraphs = paragraphsForMarket(resolved.paragraphs, market);
    }
    return resolved;
  });

  const firstContentSection = contentSections[0];
  const scrollTarget = firstContentSection ? `#${sectionId(firstContentSection, 0)}` : undefined;
  const secondaryActionHref = page.relatedPages?.[0]
    ? marketHref(market, `/${page.relatedPages[0]}`)
    : marketHref(market, "/#tools");
  const secondaryActionLabel = page.relatedPages?.[0] ? "Read related guides" : "Explore tools";
  const sectionNavItems =
    page.sectionNav ??
    contentSections
      .filter((section) => section.kind !== "lead" && section.kind !== "disclaimer")
      .map((section, index) => ({
        anchor: sectionId(section, index),
        label: "eyebrow" in section && section.eyebrow
          ? section.eyebrow
          : "heading" in section
            ? section.heading
            : section.kind,
      }));

  return (
    <div>
      <Hero
        market={market}
        sectionId={heroSectionId}
        eyebrow={`${page.eyebrow} · ${marketLabel} market`}
        titlePrefix={first}
        titleAccent={rest ?? ""}
        subtitle={page.heroSubtitle ? interpolateMarket(page.heroSubtitle, market) : `${page.lede} This page is written for the ${marketLabel} market.`}
        primaryAction={{ label: "Book Consultation", href: marketHref(market, "/#contact") }}
        secondaryAction={{ label: secondaryActionLabel, href: secondaryActionHref }}
        scrollTarget={scrollTarget}
        scrollLabel={`Explore the ${marketLabel} page`}
      />
      {statusSections.map((section, index) => (
        <StatusBanner key={index} section={section} />
      ))}
      <Breadcrumbs page={page} market={market} />
      {page.facts ? <FactsStrip section={{ kind: "facts", items: deepInterpolate(page.facts, market) as NonNullable<PageContent["facts"]> }} /> : null}
      <SectionNav items={sectionNavItems} />

      {leadImage ? (
        <section className="bg-white py-14 md:py-16" aria-label={`${page.title} overview image`}>
          <Container>
            <figure className="overflow-hidden rounded-[32px] border border-brand-600/10 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={leadImage.src} alt={leadImage.alt} className="h-56 w-full object-cover md:h-80" loading="lazy" />
              {leadImage.label ? (
                <figcaption className="border-t border-inherit px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {leadImage.label}
                </figcaption>
              ) : null}
            </figure>
          </Container>
        </section>
      ) : null}

      {contentSections.map((section, index) => {
        const id = sectionId(section, index);
        const dark = section.kind === "process";
        const tone = dark ? "aurora" : index % 2 === 0 ? "white" : "slate";
        return (
          <section key={id} id={id} className={cn("anchor-offset py-14 md:py-20", tone === "white" ? "bg-white" : tone === "slate" ? "bg-slate-50" : "bg-aurora-bg text-aurora-text")}>
            <Container>
              {section.kind === "faq" || section.kind === "lead" || section.kind === "disclaimer" ? null : (
                <SectionHeadingBlock
                  eyebrow={"eyebrow" in section && section.eyebrow ? section.eyebrow : page.eyebrow}
                  heading={"heading" in section ? section.heading : page.title}
                  lede={"lede" in section ? section.lede : undefined}
                  dark={dark}
                />
              )}
              <SectionContent section={section} tone={tone} />
            </Container>
          </section>
        );
      })}

      {!page.id.startsWith("legal/") ? <MediaGallerySection pageId={page.id} tone="soft" market={market} /> : null}

      {page.officialSources.length > 0 ? (
        <section className="bg-aurora-bg py-14 text-aurora-text md:py-20">
          <Container>
            <SectionHeadingBlock eyebrow="Verification" heading="Official sources" dark />
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <ul className="grid gap-3 sm:grid-cols-2">
                {page.officialSources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 text-sm text-aurora-muted transition-colors hover:text-aurora-text"
                    >
                      <span className="text-leaf" aria-hidden="true">↗</span>
                      <span className="group-hover:underline">{source.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-aurora-muted">
                Last verified: <strong className="text-aurora-text">{page.lastVerified}</strong>
                <br />
                Immigration rules change frequently — always confirm current requirements on official
                government pages.
              </p>
            </div>
          </Container>
        </section>
      ) : null}

      {(page.relatedPages?.length ?? 0) > 0 || (page.relatedTools?.length ?? 0) > 0 ? (
        <section className="bg-slate-50 py-14 md:py-20">
          <Container>
            <SectionHeadingBlock eyebrow="Continue exploring" heading="Related guides" />
            <RelatedCards page={page} market={market} />
          </Container>
        </section>
      ) : null}

      <section className="bg-aurora-bg py-16 text-aurora-text md:py-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-mega text-leaf-soft">Start with clarity</p>
              <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-bold leading-tight md:text-4xl">
                Could Express Entry be the right route for you?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-aurora-muted">
                Speak with the DMC team about program fit, documentation priorities, CRS factors and a realistic next step for your profile.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={marketHref(market, "/#contact")} variant="white" size="lg">
                Book Consultation
              </Button>
              <Button href="tel:+97143447757" variant="outline" size="lg">
                Call +971 4 344 7757
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
