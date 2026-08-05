import { SectionHeading } from "@/components/ui/SectionHeading";

import type { Market } from "@/config/markets";
import { marketOffice } from "@/lib/i18n/market-copy";

const STEPS = [
  {
    number: "01",
    title: "Private consultation",
    text: "We understand your profile, priorities and preferred destinations in your local market.",
  },
  {
    number: "02",
    title: "Eligibility review",
    text: "Qualifications, experience, language and finances are evaluated.",
  },
  {
    number: "03",
    title: "Pathway strategy",
    text: "A route, document plan and milestones are set.",
  },
  {
    number: "04",
    title: "Case preparation",
    text: "Documents are organised, checked and submitted.",
  },
  {
    number: "05",
    title: "Ongoing guidance",
    text: "Support through updates, requests and decisions.",
  },
];

export function ProcessSection({ market }: { market: Market }) {
  return (
    <section id="process" className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow="The immigration process"
          title="From uncertainty to a clear direction"
          lede={`Each stage is reviewed before the next begins, giving you visibility over strategy, responsibilities and progress — with ${marketOffice(market)} guiding you end to end.`}
        />
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div
            aria-hidden="true"
            className="step-line absolute left-[10%] right-[10%] top-6 hidden h-px bg-slate-200 lg:block"
          />
          {STEPS.map((step) => (
            <article key={step.number} className="relative fade-up">
              <div className="relative z-10 mb-4 flex size-12 items-center justify-center rounded-full bg-brand-600 font-display font-bold text-white">
                {step.number}
              </div>
              <h3 className="font-display text-sm font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
