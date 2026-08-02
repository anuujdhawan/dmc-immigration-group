import { ArrowRight, BookOpen, Camera, Clapperboard, FileText, HelpCircle, Newspaper, PhoneCall, Star } from "lucide-react";

import type { Market } from "@/config/markets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";
import { marketHref } from "@/lib/routing/routes";

const RESOURCES = [
  {
    icon: Newspaper,
    title: "Blog & Immigration News",
    text: "Policy changes, intake rounds and program updates across every destination we cover.",
    href: "/blog",
    cta: "Read the blog",
  },
  {
    icon: HelpCircle,
    title: "FAQs",
    text: "Straight answers to the questions we hear most, before you commit to anything.",
    href: "/faqs",
    cta: "Read FAQs",
  },
  {
    icon: FileText,
    title: "Guides & Checklists",
    text: "Document lists and step-by-step prep guides for every program we handle.",
    href: "/guides",
    cta: "Browse guides",
  },
  {
    icon: Star,
    title: "Success Stories",
    text: "Real client outcomes — visa type, country, timeline and the steps that got them there.",
    href: "/success-stories",
    cta: "See stories",
  },
  {
    icon: Clapperboard,
    title: "Video Success Stories",
    text: "Short clips from clients on what the process actually felt like, in their own words.",
    href: "/video-success-stories",
    cta: "Watch videos",
  },
  {
    icon: Camera,
    title: "Gallery",
    text: "Office visits, client milestones and moments from our teams across every branch.",
    href: "/gallery",
    cta: "Browse gallery",
  },
  {
    icon: BookOpen,
    title: "Press & Media",
    text: "Where DMC has been featured, and what the media says about our work.",
    href: "/press-media",
    cta: "See press",
  },
  {
    icon: PhoneCall,
    title: "Call Me Back",
    text: "Leave your number and a consultant will call you back — no form essays required.",
    href: "/contact",
    cta: "Request a callback",
  },
];

export function ResourcesSection({ market }: { market: Market }) {
  return (
    <SectionShell id="resources">
      <Container>
        <SectionHeading
          eyebrow="Resources"
          title="Everything you need, in one place"
          lede="Guides, checklists, real outcomes and the latest immigration news — free to browse before you book anything."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {RESOURCES.map((resource) => (
            <a
              key={resource.title}
              href={marketHref(market, resource.href)}
              className="group flex flex-col rounded-card border border-dmc-card-border bg-white p-6 shadow-sm transition-shadow hover:shadow-brand-glow"
            >
              <resource.icon aria-hidden="true" className="mb-4 size-6 text-brand-600" />
              <h3 className="font-display text-base font-bold text-charcoal">{resource.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{resource.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-600">
                {resource.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
