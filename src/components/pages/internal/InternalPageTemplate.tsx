"use client";

import Link from "next/link";
import { useCallback, useRef, useState, type FormEvent, type ReactNode } from "react";

import { MARKET_LABELS, MARKET_LIST, type Market } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";
import { galleryFor } from "@/config/page-gallery";
import { interpolateMarket, marketAudience } from "@/lib/i18n/market-copy";
import { MediaCard, MediaCardGrid, type MediaCardItem } from "@/components/ui/MediaCard";

type TextBlock = string | ReactNode;

export type AnchorItem = {
  href: string;
  label: string;
};

export type FactItem = {
  label: string;
  value: string;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type MediaAsset = {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
};

export type ProgramItem = {
  code: string;
  num: string;
  title: string;
  body: string;
  label: string;
};

export type FeatureItem = {
  title: string;
  body: string;
};

export type CriteriaItem = {
  num: string;
  body: string;
};

export type ScoreRow = {
  label: string;
  value: string;
};

export type EvidenceItem = {
  icon: string;
  label: string;
  title: string;
  body: string;
};

export type RoadmapItem = {
  small: string;
  title: string;
  body: string;
  img: string;
};

export type BlogPostItem = {
  href: string;
  img: string;
  alt: string;
  meta: string;
  title: string;
  body: string;
};

export type PartnerLogoItem = {
  src: string;
  alt: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export function InternalBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="ee-breadcrumb" aria-label="Breadcrumb">
      <div className="ee-shell">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span className="ee-breadcrumb-part" key={`${item.label}-${index}`}>
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <strong aria-current={isLast ? "page" : undefined}>{item.label}</strong>
              )}
              {!isLast ? <span aria-hidden="true">›</span> : null}
            </span>
          );
        })}
      </div>
    </nav>
  );
}

export function InternalFactsBar({ items }: { items: FactItem[] }) {
  return (
    <aside className="ee-facts">
      <div className="ee-shell ee-facts-grid">
        {items.map((item) => (
          <div className="ee-fact" key={item.label}>
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function InternalAnchorNav({ items }: { items: AnchorItem[] }) {
  return (
    <nav className="ee-anchor-nav" aria-label="Express Entry page sections">
      <div className="ee-shell ee-anchor-scroll">
        {items.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function InternalSection({
  id,
  tone = "white",
  className = "",
  labelledBy,
  children,
}: {
  id?: string;
  tone?: "white" | "soft" | "dark";
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  const toneClass = tone === "soft" ? "ee-section-soft" : tone === "dark" ? "ee-section-dark" : "ee-section-white";

  return (
    <section className={`ee-section ${toneClass} ${className}`.trim()} id={id} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  copy,
  titleId,
}: {
  kicker: string;
  title: TextBlock;
  copy?: TextBlock;
  titleId?: string;
}) {
  return (
    <header className="ee-section-head">
      <span className="ee-kicker">{kicker}</span>
      <h2 className="ee-heading" id={titleId}>
        {title}
      </h2>
      {copy ? <p className="ee-copy">{copy}</p> : null}
    </header>
  );
}

export function MediaFrame({ asset, variant = "landscape" }: { asset: MediaAsset; variant?: "landscape" | "portrait" }) {
  return (
    <figure className={`ee-media ee-media-${variant}`}>
      <img
        alt={asset.alt}
        decoding="async"
        fetchPriority={asset.priority ? "high" : undefined}
        loading={asset.priority ? undefined : "lazy"}
        src={asset.src}
      />
      {asset.label ? <figcaption className="ee-image-label">{asset.label}</figcaption> : null}
    </figure>
  );
}

export function SplitContentSection({
  id,
  tone = "white",
  reverse = false,
  media,
  mediaVariant = "landscape",
  kicker,
  title,
  children,
  after,
}: {
  id?: string;
  tone?: "white" | "soft";
  reverse?: boolean;
  media: MediaAsset;
  mediaVariant?: "landscape" | "portrait";
  kicker: string;
  title: TextBlock;
  children: ReactNode;
  after?: ReactNode;
}) {
  return (
    <InternalSection id={id} tone={tone}>
      <div className={`ee-shell ee-split${reverse ? " ee-split-reverse" : ""}`}>
        <MediaFrame asset={media} variant={mediaVariant} />
        <div>
          <span className="ee-kicker">{kicker}</span>
          <h2 className="ee-heading">{title}</h2>
          {children}
          {after}
        </div>
      </div>
    </InternalSection>
  );
}

export function RichCopy({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="ee-rich-copy">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export function BenefitsGrid({ items }: { items: string[] }) {
  return (
    <div className="ee-benefits">
      {items.map((item) => (
        <div key={item} className="ee-benefit">
          <span className="ee-check">✓</span>
          <b>{item}</b>
        </div>
      ))}
    </div>
  );
}

export function AssessmentForm({ market, phone }: { market: Market; phone: string }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Thank you. To complete your consultation request, please call ${phone}.`);
  };

  return (
    <form className="ee-form ee-hero-form" onSubmit={handleSubmit}>
      <div className="ee-form-row">
        <input aria-label="Full name" placeholder="Full name" required />
        <input aria-label="Email address" placeholder="Email address" type="email" />
      </div>
      <div className="ee-form-row">
        <input aria-label="Phone number" placeholder="Phone number" required type="tel" />
        <select aria-label="Country of interest">
          <option value="">Migrate, visit or work country</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>New Zealand</option>
          <option>Europe</option>
          <option>United Kingdom</option>
          <option>United States</option>
          <option>Germany</option>
        </select>
      </div>
      <div className="ee-form-row">
        <select aria-label="Age range">
          <option value="">Age range</option>
          <option>18-25 years</option>
          <option>26-30 years</option>
          <option>31-35 years</option>
          <option>36-40 years</option>
          <option>41-45 years</option>
          <option>45+ years</option>
        </select>
        <select aria-label="Highest education">
          <option value="">Highest education</option>
          <option>High school</option>
          <option>2-year diploma</option>
          <option>3-year diploma</option>
          <option>Bachelor&apos;s degree</option>
          <option>Master&apos;s degree</option>
          <option>Doctorate</option>
        </select>
      </div>
      <div className="ee-form-row">
        <select aria-label="Years of work experience">
          <option value="">Years of work experience</option>
          <option>No experience</option>
          <option>Less than 1 year</option>
          <option>1-2 years</option>
          <option>3-4 years</option>
          <option>5+ years</option>
        </select>
        <select aria-label="Immigration type">
          <option value="">Immigration type</option>
          <option>General migration</option>
          <option>Student visa</option>
          <option>Business migration</option>
          <option>Visit visa</option>
          <option>High-value migration</option>
        </select>
      </div>
      <select aria-label="Preferred DMC location" defaultValue={market}>
        <option value="">Preferred DMC location</option>
        {MARKET_LIST.map((marketOption) => (
          <option key={marketOption} value={marketOption}>
            {MARKET_LABELS[marketOption]}
          </option>
        ))}
      </select>
      <label className="ee-consent">
        <input required type="checkbox" />
        <span>
          I accept the <Link href={marketHref(market, "/legal/terms-and-conditions")}>Terms &amp; Conditions</Link> and
          consent to being contacted about my enquiry.
        </span>
      </label>
      <button className="ee-button ee-button-primary" type="submit">
        Book Your Free Assessment →
      </button>
    </form>
  );
}

export function LeadFormSection({
  market,
  phone,
  kicker,
  title,
  copy,
}: {
  market: Market;
  phone: string;
  kicker: string;
  title: string;
  copy: string[];
}) {
  return (
    <section className="ee-section ee-section-alt" aria-labelledby="ee-hero-form-title">
      <div className="ee-shell ee-hero-form-wrap">
        <div className="ee-hero-form-intro">
          <span className="ee-kicker">{interpolateMarket(kicker, market)}</span>
          <h2 className="ee-heading" id="ee-hero-form-title">
            {interpolateMarket(title, market)}
          </h2>
          {copy.map((paragraph) => (
            <p className="ee-copy" key={paragraph}>
              {interpolateMarket(paragraph, market)}
            </p>
          ))}
          <div className="ee-hero-form-contact">
            <strong>Prefer to call?</strong>
            <span>{phone}</span>
          </div>
        </div>
        <AssessmentForm market={market} phone={phone} />
      </div>
    </section>
  );
}

export function ProgramCards({ items }: { items: ProgramItem[] }) {
  return (
    <div className="ee-program-grid">
      {items.map((item) => (
        <article key={item.code} className="ee-program" data-number={item.num}>
          <span className="ee-program-code">{item.code}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <span className="ee-program-label">{item.label}</span>
        </article>
      ))}
    </div>
  );
}

export function FeatureList({ items }: { items: FeatureItem[] }) {
  return (
    <div className="ee-feature-list">
      {items.map((item) => (
        <article key={item.title} className="ee-feature-item">
          <span>•</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function CriteriaGrid({ items }: { items: CriteriaItem[] }) {
  return (
    <div className="ee-criteria">
      {items.map((item) => (
        <div key={item.num} className="ee-criterion">
          <small>{item.num}</small>
          <strong>{item.body}</strong>
        </div>
      ))}
    </div>
  );
}

export function ScoreCard({
  id,
  score,
  caption,
  rows,
  note,
}: {
  id?: string;
  score: string;
  caption: string;
  rows: ScoreRow[];
  note: string;
}) {
  return (
    <aside className="ee-score-card" id={id}>
      <div className="ee-score-head">
        <strong>{score}</strong>
        <span>{caption}</span>
      </div>
      {rows.map((row) => (
        <div className="ee-score-row" key={row.label}>
          <span>{row.label}</span>
          <b>{row.value}</b>
        </div>
      ))}
      <p className="ee-note">{note}</p>
    </aside>
  );
}

export function DocumentList({ items, note }: { items: string[]; note: string }) {
  return (
    <>
      <div className="ee-doc-list">
        {items.map((text, index) => (
          <div key={text} className="ee-document">
            <span>{String(index + 1).padStart(2, "0")}</span>
            {text}
          </div>
        ))}
      </div>
      <p className="ee-doc-note">{note}</p>
    </>
  );
}

export function ProcessSection({
  id,
  kicker,
  title,
  copy,
  image,
  steps,
}: {
  id: string;
  kicker: string;
  title: TextBlock;
  copy: string;
  image: MediaAsset;
  steps: Array<{ num: string; title: string; body: string }>;
}) {
  return (
    <InternalSection id={id} tone="dark">
      <div className="ee-shell">
        <SectionHeader kicker={kicker} title={title} copy={copy} />
        <div className="ee-process-layout">
          <figure className="ee-process-visual">
            <img alt={image.alt} loading="lazy" src={image.src} />
          </figure>
          <div className="ee-process-steps">
            {steps.map((step) => (
              <article key={step.num} className="ee-process-step">
                <span>{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </InternalSection>
  );
}

export function ConsultationForm({ market, phone }: { market: Market; phone: string }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Thank you. To complete your consultation request, please call ${phone}.`);
  };

  return (
    <form className="ee-form" onSubmit={handleSubmit}>
      <input aria-label="Consultation full name" placeholder="Full name" required />
      <input aria-label="Consultation phone number" placeholder="Phone number" required type="tel" />
      <input aria-label="Consultation email" placeholder="Email address" type="email" />
      <select aria-label="Preferred DMC consultation location" defaultValue={market}>
        <option value="">Preferred location</option>
        {MARKET_LIST.map((marketOption) => (
          <option key={marketOption} value={marketOption}>
            {MARKET_LABELS[marketOption]}
          </option>
        ))}
      </select>
      <button className="ee-button ee-button-light" type="submit">
        Request Consultation →
      </button>
    </form>
  );
}

export function ConsultationBand({
  market,
  title,
  copy,
  phone,
}: {
  market: Market;
  title: string;
  copy: string;
  phone: string;
}) {
  return (
    <section className="ee-consult-band" aria-labelledby="ee-free-consult-title">
      <div className="ee-shell ee-consult-grid">
        <header>
          <span className="ee-kicker">Schedule a free consultation</span>
          <h2 id="ee-free-consult-title">{interpolateMarket(title, market)}</h2>
          <p>{interpolateMarket(copy, market)}</p>
        </header>
        <ConsultationForm market={market} phone={phone} />
      </div>
    </section>
  );
}

export function GuidanceSection({
  id,
  kicker,
  title,
  paragraphs,
  items,
}: {
  id: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  items: Array<{ num: string; title: string; body: string }>;
}) {
  return (
    <InternalSection id={id} tone="soft">
      <div className="ee-shell ee-guidance-grid">
        <aside className="ee-guidance-panel">
          <span className="ee-kicker" style={{ color: "var(--ee-200)" }}>
            {kicker}
          </span>
          <h2>{title}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <button className="ee-button ee-button-light" type="button">
            Speak with DMC →
          </button>
        </aside>
        <div className="ee-guidance-list">
          {items.map((item) => (
            <article key={item.num} className="ee-guidance-item">
              <span>{item.num}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </InternalSection>
  );
}

export function EvidenceGrid({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="ee-evidence-grid">
      {items.map((item) => (
        <article key={item.label} className="ee-evidence-card">
          <span className="ee-evidence-icon">
            <img alt="" loading="lazy" src={item.icon} />
          </span>
          <small>{item.label}</small>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function RoadmapGrid({ items }: { items: RoadmapItem[] }) {
  return (
    <div className="ee-roadmap-grid">
      {items.map((item) => (
        <article key={item.small} className="ee-roadmap-card">
          <span className="ee-roadmap-icon" aria-hidden="true">
            <img src={item.img} alt="" width="38" height="38" style={{ objectFit: "contain" }} />
          </span>
          <small>{item.small}</small>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function FaqSection({
  id,
  items,
  market,
}: {
  id: string;
  items: FaqItem[];
  market?: Market;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const resolvedItems = market ? items.map((item) => ({ q: interpolateMarket(item.q, market), a: interpolateMarket(item.a, market) })) : items;

  return (
    <InternalSection id={id} tone="soft">
      <div className="ee-shell ee-faq-grid">
        <header className="ee-faq-intro">
          <span className="ee-kicker">Frequently asked questions</span>
          <h2 className="ee-heading">
            Express Entry, <span>explained clearly.</span>
          </h2>
          <p className="ee-copy">
            Straightforward answers to the questions applicants most often raise about eligibility, ranking,
            documentation, costs and timelines{market ? ` — prepared for ${marketAudience(market)}.` : "."}
          </p>
        </header>
        <div>
          {resolvedItems.map((item, index) => (
            <article key={item.q} className={`ee-faq-item${openFaq === index ? " open" : ""}`}>
              <button
                className="ee-faq-question"
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {item.q}
                <span className="ee-faq-icon">+</span>
              </button>
              <div className="ee-faq-answer">
                <p>{item.a}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </InternalSection>
  );
}

export function BlogGrid({ posts }: { posts: BlogPostItem[] }) {
  const items: MediaCardItem[] = posts.map((post) => ({
    src: post.img,
    alt: post.alt,
    title: post.title,
    body: post.body,
    meta: post.meta,
    href: post.href,
    external: true,
    cta: "Read article →",
  }));
  return <MediaCardGrid items={items} variant="blog" />;
}

export function StoryCarousel({ stories }: { stories: string[] }) {
  const storyTrackRef = useRef<HTMLUListElement>(null);

  const moveStories = useCallback((direction: number) => {
    if (!storyTrackRef.current) return;
    storyTrackRef.current.scrollBy({
      left: direction * Math.max(300, storyTrackRef.current.clientWidth * 0.72),
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="ee-story-carousel">
      <div className="ee-story-controls" aria-label="Success story controls">
        <button aria-label="Previous success stories" className="ee-story-control" type="button" onClick={() => moveStories(-1)}>
          ←
        </button>
        <button aria-label="Next success stories" className="ee-story-control" type="button" onClick={() => moveStories(1)}>
          →
        </button>
      </div>
      <ul className="ee-story-track" ref={storyTrackRef} tabIndex={0}>
        {stories.map((src, index) => (
          <MediaCard
            key={src}
            variant="story"
            index={index}
            item={{
              src,
              alt: `DMC client success story ${index + 1}`,
              title: "Client success",
              count: `${String(index + 1).padStart(2, "0")} / ${String(stories.length).padStart(2, "0")}`,
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export function PartnerLogoStrip({ logos }: { logos: PartnerLogoItem[] }) {
  return (
    <section className="ee-section ee-section-white ee-logo-strip">
      <div className="ee-shell">
        <div className="ee-logo-strip-inner">
          {logos.map((logo) => (
            <img key={logo.src} src={logo.src} alt={logo.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MediaGallerySection({
  pageId,
  id = "gallery",
  tone = "white",
  kicker = "Explore the journey",
  title = (
    <>
      Life through <span>the lens.</span>
    </>
  ),
  copy,
  market,
}: {
  pageId: string;
  id?: string;
  tone?: "white" | "soft";
  kicker?: string;
  title?: ReactNode;
  copy?: string;
  market?: Market;
}) {
  const items = galleryFor(pageId);
  if (items.length === 0) return null;

  const resolvedCopy =
    copy ??
    (market
      ? `A visual tour of the destinations, documents and support that shape a DMC-guided application for ${marketAudience(market)}.`
      : "A visual tour of the destinations, documents and support that shape a DMC-guided application.");

  return (
    <InternalSection id={id} tone={tone}>
      <div className="ee-shell">
        <SectionHeader kicker={kicker} title={title} copy={resolvedCopy} />
        <div className="mt-10">
          <MediaCardGrid items={items} />
        </div>
      </div>
    </InternalSection>
  );
}

export function DisclaimerBand({ children }: { children: ReactNode }) {
  return (
    <aside className="ee-disclaimer">
      <div className="ee-shell">
        <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>
          i
        </span>
        <p>{children}</p>
      </div>
    </aside>
  );
}

export function FinalCta({
  market,
  phoneHref,
  phoneLabel,
  kicker = "Start with clarity",
  title = (
    <>
      Could Express Entry be the right <span>route for you?</span>
    </>
  ),
  copy = `Speak with the DMC team in ${MARKET_LABELS[market]} about program fit, documentation priorities, CRS factors and a realistic next step for your profile.`,
}: {
  market: Market;
  phoneHref: string;
  phoneLabel: string;
  kicker?: string;
  title?: ReactNode;
  copy?: string;
}) {
  const resolvedTitle = typeof title === "string" ? interpolateMarket(title, market) : title;
  const resolvedCopy = copy ? interpolateMarket(copy, market) : copy;

  return (
    <section className="ee-cta" id="contact">
      <div className="ee-shell ee-cta-grid">
        <header>
          <span className="ee-kicker">{interpolateMarket(kicker, market)}</span>
          <h2 className="ee-heading">{resolvedTitle}</h2>
          <p className="ee-copy">{resolvedCopy}</p>
        </header>
        <div className="ee-cta-actions">
          <a className="ee-button ee-button-light" href={marketHref(market, "/#contact")}>
            Book Consultation →
          </a>
          <a className="ee-button ee-button-outline" href={phoneHref}>
            Call {phoneLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
