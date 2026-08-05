import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";

const RESOURCES = [
  { title: "Blog & Immigration News", text: "Policy changes, intake rounds and program updates across every destination we cover.", href: "/blog", cta: "Read the blog" },
  { title: "FAQs", text: "Straight answers to the questions we hear most, before you commit to anything.", href: "/faqs", cta: "Read FAQs" },
  { title: "Guides & Checklists", text: "Document lists and step-by-step prep guides for every program we handle.", href: "/guides", cta: "Browse guides" },
  { title: "Success Stories", text: "Real client outcomes — visa type, country, timeline and the steps that got them there.", href: "/success-stories", cta: "See stories" },
  { title: "Video Success Stories", text: "Short clips from clients on what the process actually felt like, in their own words.", href: "/video-success-stories", cta: "Watch videos" },
  { title: "Gallery", text: "Office visits, client milestones and moments from our teams across every branch.", href: "/gallery", cta: "Browse gallery" },
  { title: "Press & Media", text: "Where DMC has been featured, and what the media says about our work.", href: "/press-media", cta: "See press" },
  { title: "Call Me Back", text: "Leave your number and a consultant will call you back — no form essays required.", href: "/contact", cta: "Request a callback" },
];

export function ResourcesSection({ market }: { market: Market }) {
  return (
    <section id="resources" className="template-resources bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="fade-up mb-12 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Resources</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Everything you need, in one place</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
            Guides, checklists, real outcomes and the latest immigration news - free to browse before you book anything, curated for {MARKET_LABELS[market]} residents.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((resource) => {
            return (
              <article
                key={resource.title}
                className="group fade-up flex h-full flex-col rounded-[24px] border border-slate-100 border-t-4 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <span aria-label="DMC Immigration" className="brand-logo resource-brand-mark" role="img" />
                <h3 className="font-display font-bold text-ink">{resource.title}</h3>
                <p className="mt-2 leading-relaxed text-sm text-slate-500">{resource.text}</p>
                {resource.cta ? (
                  <div className="mt-auto pt-4">
                    {resource.title === "Call Me Back" ? (
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors duration-300 hover:text-brand-700"
                        data-open-modal="consultationModal"
                        type="button"
                      >
                        {resource.cta}
                        <span aria-hidden="true" className="text-[9px] transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    ) : (
                      <a
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 transition-colors duration-300 hover:text-brand-800"
                        href={marketHref(market, resource.href)}
                      >
                        {resource.cta}
                        <span aria-hidden="true" className="text-[9px] transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
