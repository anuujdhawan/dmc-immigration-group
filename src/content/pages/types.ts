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

export interface SectionBase {
  anchor?: string;
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
  | (SectionBase & { kind: "faq"; heading: string; items: { question: string; answer: string }[] })
  | (SectionBase & { kind: "help"; heading: string; paragraphs: string[]; bullets?: string[] })
  | (SectionBase & { kind: "links"; heading: string; lede?: string; items: LinkItem[] });

export interface PageMarketNote {
  intro?: string;
  cta?: string;
  faq?: { question: string; answer: string }[];
}

export interface PageContent {
  id: string;
  title: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  lede: string;
  sections: PageSection[];
  relatedPages?: string[];
  relatedTools?: string[];
  lastVerified: string;
  officialSources: { label: string; url: string }[];
  marketNotes?: Partial<Record<Market, PageMarketNote>>;
  noindex?: boolean;
}
