import { ArrowRight } from "lucide-react";

import type { Market } from "@/config/markets";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { marketHref } from "@/lib/routing/routes";

export function ContactCtaSection({ market }: { market: Market }) {
  return (
    <section
      id="contact"
      className="anchor-offset relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50/60 py-16 lg:py-24"
    >
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="text-xs font-bold uppercase tracking-mega text-brand-600">
          Your next beginning
        </p>
        <h2 className="max-w-2xl text-balance font-display text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
          Let your future take root
        </h2>
        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
          Begin with a private conversation about your profile, priorities and possible
          destinations. No rushed decisions. No unrealistic guarantees.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button href={marketHref(market, "/contact")} size="lg">
            Book Consultation
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <Button
            href={marketHref(market, "/tools/eligibility-checker")}
            size="lg"
            variant="outline"
          >
            Free Eligibility Assessment
          </Button>
        </div>
      </Container>
    </section>
  );
}
