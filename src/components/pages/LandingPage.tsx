import { type ReactNode } from "react";

import {
  ArrowRight,
  Award,
  Briefcase,
  Calculator,
  CheckCircle2,
  Flag,
  GraduationCap,
  HardHat,
  HeartPulse,
  Laptop,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Stethoscope,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";

import type { Market } from "@/config/markets";
import { getOffice } from "@/config/offices";
import type { LandingContent, LandingSection } from "@/content/landing";
import { cn } from "@/lib/utils/cn";

import { Hero } from "@/components/home/Hero";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { Container } from "@/components/ui/Container";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { VideoEmbedCard } from "@/components/ui/VideoEmbedCard";
import { LandingLeadForm } from "@/components/forms/LandingLeadForm";

const BENEFIT_ICONS = [Briefcase, GraduationCap, HeartPulse, Users, MapPin, Flag];
const OCCUPATION_ICONS = [Laptop, Wrench, Stethoscope, HardHat, Calculator, Truck];

function CtaLink({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href="#lead-form"
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(53,142,26,.28)] transition hover:bg-brand-700 hover:shadow-[0_14px_36px_rgba(53,142,26,.36)]",
        className,
      )}
    >
      {label}
      <ArrowRight aria-hidden="true" className="size-4" />
    </a>
  );
}

function SectionKicker({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-mega",
        dark ? "text-leaf-soft" : "text-brand-600",
      )}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <h2
      className={cn(
        "max-w-3xl text-balance text-3xl font-bold leading-tight md:text-4xl lg:text-[2.6rem]",
        dark ? "text-aurora-text" : "text-charcoal",
      )}
    >
      {children}
    </h2>
  );
}

function CheckItem({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed md:text-base">
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-bold",
          dark ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700",
        )}
      >
        ✓
      </span>
      <span className={dark ? "text-aurora-muted" : "text-ink/80"}>{children}</span>
    </li>
  );
}

function CardGrid({
  items,
  icons,
}: {
  items: { title: string; copy: string }[];
  icons: typeof BENEFIT_ICONS;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length];
        return (
          <article
            key={item.title}
            className="group flex h-full flex-col gap-4 rounded-[26px] border border-brand-600/10 bg-white/85 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-[0_18px_44px_rgba(16,41,10,.09)]"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <h3 className="font-display text-lg font-bold text-charcoal">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{item.copy}</p>
          </article>
        );
      })}
    </div>
  );
}

/**
 * Benefits grid matching the DMC template card language (`ee-feature-item`):
 * horizontal icon-left cards with organic asymmetric corners, a gradient icon
 * tile with an inset ring + soft shadow, and a hover lift with deeper shadow.
 */
function BenefitsGrid({ section }: { section: Extract<LandingSection, { kind: "benefits" }> }) {
  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <SectionKicker>{section.kicker}</SectionKicker>
        <SectionTitle>{section.title}</SectionTitle>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {section.items.map((item, index) => {
          const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
          const flipped = index % 2 === 1;
          return (
            <article
              key={item.title}
              className={cn(
                "group flex h-full items-start gap-4 border border-brand-600/10 bg-white/85 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-600/25 hover:shadow-[0_30px_72px_rgba(16,41,10,.11)] md:gap-5 md:p-6",
                flipped ? "rounded-[48px_20px_20px_20px]" : "rounded-[20px_48px_20px_20px]",
              )}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-white to-brand-100 text-brand-700 shadow-[inset_0_0_0_1px_rgba(53,142,26,.12),0_10px_24px_rgba(16,41,10,.08)] transition-transform duration-300 group-hover:scale-105 md:size-14 md:rounded-2xl">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-bold leading-snug text-charcoal md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.copy}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function LeadCaptureSection({ content, market }: { content: LandingContent; market: Market }) {
  const office = getOffice(market);
  return (
    <section
      id="free-assessment"
      className="scroll-mt-32 bg-linear-to-br from-brand-50 via-white to-white py-16 sm:scroll-mt-24 md:py-24"
    >
      <Container className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
        <div className="space-y-5">
          <SectionKicker>Free assessment</SectionKicker>
          <SectionTitle>Check Your Free Eligibility</SectionTitle>
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {content.form.subtitle}
          </p>
          <ul className="space-y-3">
            {content.form.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-semibold text-charcoal">
                <CheckCircle2 aria-hidden="true" className="size-5 text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <Phone aria-hidden="true" className="size-4 text-brand-600" />
              {office.phoneDisplay}
            </span>
            <span className="inline-flex items-center gap-2">
              <Award aria-hidden="true" className="size-4 text-brand-600" />
              Regulated consultants
            </span>
          </div>
        </div>

        {/* scroll-mt-32 (128px) + the global 104px scroll-padding-top land the
            form just under the sticky landing header on every viewport. */}
        <div
          id="lead-form"
          className="scroll-mt-32 rounded-4xl border border-brand-600/10 bg-white p-6 shadow-[0_24px_70px_rgba(16,41,10,.12)] md:p-8"
        >
          <p className="mb-5 text-center font-display text-2xl font-bold text-charcoal">
            {content.form.title}
          </p>
          <LandingLeadForm
            market={market}
            pageId={content.id}
            destination={content.destination}
            preferredOffices={content.form.preferredOffices}
            submitLabel={content.form.submitLabel}
          />
        </div>
      </Container>
    </section>
  );
}

function DestinationSkylineSection({ skyline }: { skyline: LandingContent["skyline"] }) {
  return (
    <section className="relative flex min-h-105 items-center overflow-hidden bg-brand-950 md:min-h-135">
      <Image
        src={skyline.image}
        alt={skyline.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-brand-950/95 via-brand-950/60 to-brand-950/25"
      />
      <Container className="relative py-20 text-center md:py-24">
        <SectionKicker dark>{skyline.kicker}</SectionKicker>
        <SectionTitle dark>{skyline.title}</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-8 text-aurora-text [text-shadow:0_1px_2px_rgba(5,10,6,0.55)] md:text-lg">
          {skyline.copy}
        </p>
        <div className="mt-8">
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-brand-800 shadow-md transition hover:bg-brand-50"
          >
            {skyline.cta}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}

function SocialProofStrip({ items }: { items: string[] }) {
  return (
    <div className="border-y border-brand-600/10 bg-white">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 py-7 text-center sm:grid-cols-4">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-mega text-brand-900/70"
            >
              <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-brand-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

function WhySection({ section }: { section: Extract<LandingSection, { kind: "why" }> }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-4">
        <SectionKicker>{section.kicker}</SectionKicker>
        <SectionTitle>{section.title}</SectionTitle>
      </div>
      <div className="space-y-5 text-base leading-8 text-muted">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function ChecklistSection({ section }: { section: Extract<LandingSection, { kind: "checklist" }> }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-4">
        <SectionKicker>{section.kicker}</SectionKicker>
        <SectionTitle>{section.title}</SectionTitle>
      </div>
      <div className="space-y-6">
        <ul className="grid gap-3 sm:grid-cols-2">
          {section.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-brand-600/10 bg-white p-4 text-sm leading-relaxed text-ink/80"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-muted md:text-base">{section.closing}</p>
        <CtaLink label={section.cta} />
      </div>
    </div>
  );
}

function PathwayCards({ items }: { items: { title: string; copy: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="flex h-full flex-col gap-3 rounded-[26px] border border-brand-600/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(16,41,10,.09)]"
        >
          <span className="block text-[11px] font-bold uppercase tracking-mega-xl text-brand-600">
            {String(index + 1).padStart(2, "0")} · {item.title}
          </span>
          <p className="text-sm leading-relaxed text-muted">{item.copy}</p>
        </article>
      ))}
    </div>
  );
}

function ExpressEntrySection({ section }: { section: Extract<LandingSection, { kind: "express-entry" }> }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-4">
        <SectionKicker>{section.kicker}</SectionKicker>
        <SectionTitle>{section.title}</SectionTitle>
        <p className="text-sm leading-7 text-muted md:text-base">{section.lead}</p>
      </div>
      <div className="space-y-6">
        <ol className="space-y-3">
          {section.howItWorks.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-4 rounded-2xl border border-brand-600/10 bg-white p-4 text-sm leading-relaxed text-ink/80"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-600 font-bold text-white">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="rounded-[26px] border border-brand-600/10 bg-brand-50/60 p-6">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-mega-xl text-brand-700">
            Programs under Express Entry
          </p>
          <ul className="space-y-3">
            {section.programs.map((program) => (
              <li key={program.title} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-600" />
                <span>
                  <strong className="font-bold text-charcoal">{program.title}.</strong> {program.copy}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm leading-relaxed text-muted md:text-base">{section.closing}</p>
        <CtaLink label={section.cta} />
      </div>
    </div>
  );
}

function PnpSection({ section }: { section: Extract<LandingSection, { kind: "pnp" }> }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-4">
        <SectionKicker>{section.kicker}</SectionKicker>
        <SectionTitle>{section.title}</SectionTitle>
        <p className="text-sm leading-7 text-muted md:text-base">{section.lead}</p>
      </div>
      <div className="space-y-6">
        <ul className="space-y-3">
          {section.items.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-muted md:text-base">{section.closing}</p>
        <CtaLink label={section.cta} />
      </div>
    </div>
  );
}

function PointsSection({ section }: { section: Extract<LandingSection, { kind: "points" }> }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-4">
        <SectionKicker>{section.kicker}</SectionKicker>
        <SectionTitle>{section.title}</SectionTitle>
        <p className="text-sm leading-7 text-muted md:text-base">{section.lead}</p>
      </div>
      <div className="space-y-6">
        <ul className="space-y-3">
          {section.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-brand-600/10 bg-white p-4 text-sm leading-relaxed text-ink/80"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-muted md:text-base">{section.closing}</p>
        <CtaLink label={section.cta} />
      </div>
    </div>
  );
}

function ProcessSection({ section }: { section: Extract<LandingSection, { kind: "process" }> }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <SectionKicker>{section.kicker}</SectionKicker>
        <SectionTitle>{section.title}</SectionTitle>
      </div>
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {section.steps.map((step, index) => (
          <li
            key={step.title}
            className="relative flex h-full flex-col gap-3 rounded-[26px] border border-brand-600/10 bg-white/85 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="inline-flex w-fit rounded-full bg-brand-100 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-mega text-brand-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-base font-bold text-charcoal">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{step.copy}</p>
          </li>
        ))}
      </ol>
      <CtaLink label={section.cta} />
    </div>
  );
}

function WhyDmcSection({ content }: { content: LandingContent }) {
  const { whyDmc } = content;
  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div className="space-y-5">
        <SectionKicker dark>{whyDmc.kicker}</SectionKicker>
        <SectionTitle dark>{whyDmc.title}</SectionTitle>
        <blockquote className="rounded-[26px] border border-white/10 bg-white/5 p-6">
          <Quote aria-hidden="true" className="size-7 text-leaf" />
          <p className="mt-3 font-display text-lg font-semibold leading-relaxed text-aurora-text">
            {whyDmc.quote}
          </p>
        </blockquote>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {whyDmc.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-aurora-muted"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white"
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TestimonialsSection({ content }: { content: LandingContent }) {
  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <SectionKicker>{content.testimonials.kicker}</SectionKicker>
        <SectionTitle>{content.testimonials.title}</SectionTitle>
        {content.testimonials.note ? (
          <p className="text-sm font-semibold text-brand-700">{content.testimonials.note}</p>
        ) : null}
      </div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {content.testimonials.videos.map((video, index) => (
          <VideoEmbedCard key={video.videoId} video={video} index={index} />
        ))}
      </ul>
      <p className="mx-auto max-w-2xl text-center text-xs leading-6 text-muted">
        Success-story videos published by DMC on YouTube — they only play when you press play.
      </p>
    </div>
  );
}

function FaqSection({ content }: { content: LandingContent }) {
  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <SectionKicker>Common questions</SectionKicker>
        <SectionTitle>
          {content.destination === "australia" ? "Australia" : "Canada"} PR Questions — Answered
        </SectionTitle>
      </div>
      <div className="mx-auto max-w-3xl space-y-3">
        {content.faqs.map((faq) => (
          <AccordionItem key={faq.q} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </div>
  );
}

function FinalCtaSection({ content, market }: { content: LandingContent; market: Market }) {
  const { finalCta } = content;
  const office = getOffice(market);
  return (
    <ContactCtaSection
      market={market}
      content={{
        kicker: finalCta.kicker,
        title: finalCta.title,
        copy: finalCta.copy,
        primaryLabel: finalCta.primaryLabel,
        primaryHref: "#lead-form",
        callLabel: `${finalCta.callLabel} — ${office.phoneDisplay}`,
        callHref: `tel:${finalCta.callPhoneE164}`,
        urgency: finalCta.urgency,
      }}
    />
  );
}

function renderSection(section: LandingSection) {
  switch (section.kind) {
    case "why":
      return <WhySection section={section} />;
    case "checklist":
      return <ChecklistSection section={section} />;
    case "benefits":
      return <BenefitsGrid section={section} />;
    case "pathways":
      return (
        <div className="space-y-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <SectionKicker>{section.kicker}</SectionKicker>
            <SectionTitle>{section.title}</SectionTitle>
            {section.lead ? <p className="text-sm leading-7 text-muted md:text-base">{section.lead}</p> : null}
          </div>
          <PathwayCards items={section.items} />
          {section.cta ? (
            <div className="text-center">
              <CtaLink label={section.cta} />
            </div>
          ) : null}
        </div>
      );
    case "express-entry":
      return <ExpressEntrySection section={section} />;
    case "pnp":
      return <PnpSection section={section} />;
    case "points":
      return <PointsSection section={section} />;
    case "occupations":
      return (
        <div className="space-y-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <SectionKicker>{section.kicker}</SectionKicker>
            <SectionTitle>{section.title}</SectionTitle>
            {section.lead ? <p className="text-sm leading-7 text-muted md:text-base">{section.lead}</p> : null}
          </div>
          <CardGrid items={section.items} icons={OCCUPATION_ICONS} />
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <p className="text-sm leading-relaxed text-muted md:text-base">{section.closing}</p>
            <CtaLink label={section.cta} />
          </div>
        </div>
      );
    case "process":
      return <ProcessSection section={section} />;
    default:
      return null;
  }
}

export function LandingPage({ content, market }: { content: LandingContent; market: Market }) {
  return (
    <div className="scroll-smooth">
      <Hero
        market={market}
        sectionId="landing-hero"
        eyebrow={content.hero.eyebrow}
        titlePrefix={content.hero.titlePrefix}
        titleAccent={content.hero.titleAccent}
        titleSuffix="."
        subtitle={content.hero.subtitle}
        primaryAction={{ label: content.hero.primaryCta, href: "#lead-form" }}
        secondaryAction={{ label: content.hero.secondaryCta, href: "#points" }}
        proofStats={content.hero.proofStats}
        scrollTarget="#lead-form"
        scrollLabel={content.hero.scrollLabel}
      />

      <LeadCaptureSection content={content} market={market} />
      <DestinationSkylineSection skyline={content.skyline} />
      <SocialProofStrip items={content.socialProof} />

      {content.sections.map((section, index) => {
        const tone: "white" | "slate" = index % 2 === 0 ? "white" : "slate";
        const id =
          section.kind === "why"
            ? "why-pr"
            : section.kind === "checklist"
              ? "eligibility"
              : section.kind === "benefits"
                ? "benefits"
                : section.kind === "points"
                  ? "points"
                  : section.kind === "occupations"
                    ? "occupations"
                    : section.kind === "process"
                      ? "process"
                      : "pathways";
        return (
          <section
            key={`${id}-${index}`}
            id={id}
            className={cn(
              "anchor-offset py-16 md:py-24",
              tone === "white" ? "bg-white" : "bg-slate-50",
            )}
          >
            <Container>{renderSection(section)}</Container>
          </section>
        );
      })}

      <section className="bg-aurora-bg py-16 text-aurora-text md:py-24">
        <Container>
          <WhyDmcSection content={content} />
        </Container>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <TestimonialsSection content={content} />
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <FaqSection content={content} />
        </Container>
      </section>

      <FinalCtaSection content={content} market={market} />
    </div>
  );
}
