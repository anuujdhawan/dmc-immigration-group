import { MARKET_LABELS, type Market } from "@/config/markets";
import { type PageContent, type PageSection } from "@/content/pages/types";
import { breadcrumbsFor, getPageContent } from "@/content/pages";
import { marketHref } from "@/lib/routing/routes";
import { cn } from "@/lib/utils/cn";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { SectionHeading } from "@/components/ui/SectionHeading";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sectionId(section: PageSection, index: number): string {
  if (section.kind === "status") return `section-${index}`;
  return section.anchor ?? (slugify(section.heading) || `section-${index}`);
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
      {items.map((item) => (
        <li
          key={item.title}
          className="rounded-2xl border border-brand-600/10 bg-white/80 p-6 shadow-sm"
        >
          <h3 className="font-display text-lg font-bold text-charcoal">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
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
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-600/10 bg-white/80 shadow-sm">
      <dl className="divide-y divide-brand-600/10">
        {section.rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-8">
            <dt className="text-sm font-bold text-charcoal">{row.label}</dt>
            <dd className="text-sm leading-relaxed text-muted">{row.value}</dd>
          </div>
        ))}
      </dl>
      {section.note ? (
        <p className="border-t border-brand-600/10 bg-brand-50/50 px-6 py-4 text-xs leading-relaxed text-muted">
          {section.note}
        </p>
      ) : null}
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
  return (
    <ol className="relative space-y-8">
      {section.steps.map((step, index) => (
        <li key={step.title} className="relative flex gap-5">
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full font-display text-base font-bold",
              dark ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700",
            )}
          >
            {index + 1}
          </span>
          <div>
            <h3 className={cn("font-display text-lg font-bold", dark ? "text-aurora-text" : "text-charcoal")}>
              {step.title}
            </h3>
            <p className={cn("mt-1.5 text-sm leading-relaxed", dark ? "text-aurora-muted" : "text-muted")}>
              {step.body}
            </p>
          </div>
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

function SectionContent({ section, tone }: { section: PageSection; tone: "white" | "slate" | "aurora" }) {
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
    case "links":
      return <LinksGrid section={section} />;
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

function Hero({ page, market }: { page: PageContent; market: Market }) {
  const { first, rest } = splitTitle(page.title);
  return (
    <header className="relative overflow-hidden bg-[linear-gradient(145deg,#fbfdf8,#f4f8ef_58%,#edf6e7)] pb-14 pt-[var(--header-offset-mobile)] md:pb-20 md:pt-[var(--header-offset)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(69,179,24,0.13),transparent_31rem),radial-gradient(circle_at_12%_82%,rgba(53,142,26,0.08),transparent_28rem)]"
      />
      <Container className="relative">
        <p className="text-xs font-bold uppercase tracking-mega text-brand-600">{page.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-balance font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[0.95] tracking-tight text-charcoal">
          {first}
          {rest ? <span className="block font-bold text-brand-700">{rest}</span> : null}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
          {page.lede}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={marketHref(market, "/#contact")} size="lg">
            Book a consultation
          </Button>
          {page.relatedPages?.[0] ? (
            <Button href={marketHref(market, `/${page.relatedPages[0]}`)} variant="outline" size="lg">
              Read related guides
            </Button>
          ) : null}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted">
          Government authorities make all final visa and immigration decisions. Previous outcomes do not
          guarantee future approval.
        </p>
      </Container>
    </header>
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

function AnchorNav({ page }: { page: PageContent }) {
  const anchors = page.sections
    .filter((section) => section.kind !== "status")
    .map((section, index) => ({ id: sectionId(section, index), label: section.heading }));
  if (anchors.length === 0) return null;
  return (
    <nav
      aria-label="On this page"
      className="sticky top-[var(--header-offset-mobile)] z-20 border-b border-brand-600/10 bg-[rgba(250,251,247,0.93)] backdrop-blur-lg md:top-[var(--header-offset)]"
    >
      <Container className="flex min-h-14 items-center gap-6 overflow-x-auto py-3 [scrollbar-width:none]">
        {anchors.map((anchor) => (
          <a
            key={anchor.id}
            href={`#${anchor.id}`}
            className="shrink-0 text-xs font-bold uppercase tracking-wide text-muted transition-colors hover:text-brand-700"
          >
            {anchor.label}
          </a>
        ))}
      </Container>
    </nav>
  );
}

export function ProgramPage({ page, market }: { page: PageContent; market: Market }) {
  const contentSections = page.sections.filter((section) => section.kind !== "status");
  const statusSections = page.sections.filter((section) => section.kind === "status");

  return (
    <>
      <Hero page={page} market={market} />
      {statusSections.map((section, index) => (
        <StatusBanner key={index} section={section} />
      ))}
      <Breadcrumbs page={page} market={market} />
      <AnchorNav page={page} />

      {contentSections.map((section, index) => {
        const id = sectionId(section, index);
        const dark = section.kind === "process";
        const tone = dark ? "aurora" : index % 2 === 0 ? "white" : "slate";
        return (
          <section key={id} id={id} className={cn("anchor-offset py-14 md:py-20", tone === "white" ? "bg-white" : tone === "slate" ? "bg-slate-50" : "bg-aurora-bg text-aurora-text")}>
            <Container>
              {section.kind === "faq" ? null : (
                <SectionHeadingBlock
                  eyebrow={page.eyebrow}
                  heading={section.heading}
                  lede={"lede" in section ? section.lede : undefined}
                  dark={dark}
                />
              )}
              <SectionContent section={section} tone={tone} />
            </Container>
          </section>
        );
      })}

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
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-mega text-leaf-soft">Next step</p>
              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold leading-tight md:text-4xl">
                Get a structured assessment of your case
              </h2>
            </div>
            <Button href={marketHref(market, "/#contact")} variant="white" size="lg">
              Book a consultation
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
