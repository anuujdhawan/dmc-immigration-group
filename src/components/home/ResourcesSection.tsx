import { ArrowRight, BookOpen, Camera, Clapperboard, FileText, HelpCircle, Newspaper, PhoneCall, Star } from "lucide-react";

import type { Market } from "@/config/markets";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section id="resources" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow="Resources"
          title="Everything you need, in one place"
          lede="Guides, checklists, real outcomes and the latest immigration news — free to browse before you book anything."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((resource, index) => {
            const palette =
              index === 0
                ? {
                    card: "bg-red-50 border-red-100 border-t-red-500 hover:border-red-300",
                    text: "text-red-700",
                  }
                : index === 1
                  ? {
                      card: "bg-blue-50 border-blue-100 border-t-blue-500 hover:border-blue-300",
                      text: "text-blue-700",
                    }
                  : index === 2
                    ? {
                        card: "bg-brand-50 border-brand-100 border-t-brand-500 hover:border-brand-300",
                        text: "text-brand-700",
                      }
                    : index === 3
                      ? {
                          card: "bg-violet-50 border-violet-100 border-t-violet-500 hover:border-violet-300",
                          text: "text-violet-700",
                        }
                      : index === 4
                        ? {
                            card: "bg-teal-50 border-teal-100 border-t-teal-500 hover:border-teal-300",
                            text: "text-teal-700",
                          }
                        : index === 5
                          ? {
                              card: "bg-amber-50 border-amber-100 border-t-amber-500 hover:border-amber-300",
                              text: "text-amber-700",
                            }
                          : {
                              card: "bg-rose-50 border-rose-100 border-t-rose-500 hover:border-rose-300",
                              text: "text-rose-700",
                            };

            return (
              <a
                key={resource.title}
                href={marketHref(market, resource.href)}
                className={`group rounded-2xl border border-slate-100 border-t-4 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${palette.card}`}
              >
                <span aria-label="DMC Immigration" className="brand-logo resource-brand-mark" role="img" />
                <h3 className="font-display font-bold text-ink">{resource.title}</h3>
                <p className="mt-2 leading-relaxed text-sm text-slate-500">{resource.text}</p>
                {resource.cta ? (
                  <span className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${palette.text}`}>
                    {resource.cta}
                    <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                ) : null}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
