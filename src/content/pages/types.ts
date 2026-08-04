import type { Market } from "@/config/markets";

export interface ProgramItem {
  code?: string;
  title: string;
  body: string;
  label?: string;
}

export interface LinkItem {
  title: string;
  path: string;
  description?: string;
}

export interface CardItem {
  title: string;
  body?: string;
  label?: string;
  href?: string;
  image?: { src: string; alt: string };
}

export interface MediaAsset {
  src: string;
  alt: string;
  caption?: string;
}

export interface FactItem {
  label: string;
  value: string;
}

export interface LeadField {
  label: string;
  placeholder: string;
  type?: string;
  options?: string[];
}

export interface SectionBase {
  anchor?: string;
  eyebrow?: string;
  lede?: string;
}

export type PageSection =
  | (SectionBase & { kind: "status"; label: string; tone: "info" | "warning"; body: string })
  | (SectionBase & { kind: "overview"; heading: string; paragraphs: string[] })
  | (SectionBase & { kind: "eligibility"; heading: string; lede?: string; items: { title: string; body: string }[] })
  | (SectionBase & { kind: "programs"; heading: string; lede?: string; items: ProgramItem[] })
  | (SectionBase & { kind: "benefits"; heading: string; items: string[] })
  | (SectionBase & { kind: "requirements"; heading: string; items: { title: string; body: string }[] })
  | (SectionBase & { kind: "documents"; heading: string; items: string[]; note?: string })
  | (SectionBase & { kind: "panel"; heading: string; rows: { label: string; value: string }[]; note?: string })
  | (SectionBase & { kind: "process"; heading: string; steps: { title: string; body: string }[] })
  | (SectionBase & {
      kind: "split";
      eyebrow?: string;
      heading: string;
      lede?: string;
      media: MediaAsset;
      reverse?: boolean;
      paragraphs?: string[];
      bullets?: string[];
      cards?: { title: string; body: string }[];
    })
  | (SectionBase & { kind: "faq"; heading: string; items: { question: string; answer: string }[] })
  | (SectionBase & { kind: "help"; heading: string; paragraphs: string[]; bullets?: string[] })
  | (SectionBase & { kind: "cards"; heading: string; lede?: string; items: CardItem[] })
  | (SectionBase & { kind: "links"; heading: string; lede?: string; items: LinkItem[] });

export interface LeadSection {
  kind: "lead";
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  fields: LeadField[];
  consent?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  note?: string;
}

export interface FactsSection {
  kind: "facts";
  items: FactItem[];
}

export interface DisclaimerSection {
  kind: "disclaimer";
  body: string;
}

export type ExtendedPageSection = PageSection | LeadSection | FactsSection | DisclaimerSection;

export interface PageMarketNote {
  intro?: string;
  cta?: string;
  faq?: { question: string; answer: string }[];
}

export interface PageContent {
  id: string;
  title: string;
  heroTitle?: string;
  heroSubtitle?: string;
  sectionNav?: { label: string; anchor: string }[];
  facts?: FactItem[];
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  lede: string;
  sections: ExtendedPageSection[];
  relatedPages?: string[];
  relatedTools?: string[];
  lastVerified: string;
  officialSources: { label: string; url: string }[];
  marketNotes?: Partial<Record<Market, PageMarketNote>>;
  noindex?: boolean;
}
