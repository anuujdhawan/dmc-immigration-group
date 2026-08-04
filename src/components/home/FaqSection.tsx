import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { marketHref } from "@/lib/routing/routes";
import type { Market } from "@/config/markets";

const FAQS = [
  {
    question: "Which immigration pathway is suitable for me?",
    answer:
      "The right pathway depends on qualifications, experience, age, language ability, finances, family circumstances and destination preferences. A structured profile assessment should come first — you can start with the free eligibility assessment.",
  },
  {
    question: "What's the difference between your RCIC and MARA teams?",
    answer:
      "Our Canada practice is led by Regulated Canadian Immigration Consultants (RCICs) regulated by the CICC. Our Australia practice is led by agents registered with MARA/OMARA. Both are independently verifiable on their official registers.",
  },
  {
    question: "Can immigration approval be guaranteed?",
    answer:
      "No responsible consultant can guarantee a government decision. We focus on eligibility, compliance, evidence quality and accurate preparation to reduce risk. Government authorities make all final decisions.",
  },
  {
    question: "My application was refused — can you help?",
    answer:
      "Yes — refusal review is one of our core services. We request and analyse GCMS notes and build a stronger reapplication, procedural-fairness response or appeal where appropriate.",
  },
  {
    question: "Do you work with employers, not just individuals?",
    answer:
      "Yes. Our HGT division supports Canadian employers with LMIA, GTS, provincial employer nomination and compliance, plus employer-sponsored pathways into Australia.",
  },
];

export function FaqSection({ market }: { market: Market }) {
  return (
    <section id="faq" className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="fade-up">
          <SectionHeading
            align="left"
            eyebrow="Common questions"
            title="Clarity before commitment"
            lede="Start with the questions that shape the feasibility, timing and direction of your immigration plan."
          />
          <Button href={marketHref(market, "/contact")} size="lg" className="rounded-xl">
            Ask a Consultant
          </Button>
        </div>
        <div className="fade-up space-y-3">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
