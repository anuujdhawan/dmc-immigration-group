import { CheckCircle2, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";

interface ThankYouPageProps {
  programLabel: string;
  phoneDisplay: string;
  phoneHref: string;
}

/**
 * Post-submission confirmation page. Uses the normal site chrome (rendered by
 * the shared market layout) and intentionally has no hero section.
 */
export function ThankYouPage({ programLabel, phoneDisplay, phoneHref }: ThankYouPageProps) {
  return (
    <section className="bg-slate-50 pb-24 pt-40 md:pb-36 md:pt-48">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[32px] border border-brand-600/10 bg-white p-8 text-center shadow-[0_24px_70px_rgba(16,41,10,.1)] md:p-14">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand-100 text-brand-700">
            <CheckCircle2 aria-hidden="true" className="size-10" />
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-mega text-brand-600">
            Submission Received
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-charcoal md:text-4xl">
            Thank you for your enquiry
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            A DMC consultant will review your {programLabel} details and contact
            you within <strong className="font-semibold text-charcoal">1 business day</strong>.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Please keep your phone available for a call or WhatsApp message from
            our team at{" "}
            <a
              href={phoneHref}
              className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline"
            >
              <Phone aria-hidden="true" className="size-4" />
              {phoneDisplay}
            </a>
            .
          </p>
          <p className="mt-8 text-xs leading-6 text-slate-400">
            Immigration outcomes are determined by relevant government authorities and
            cannot be guaranteed.
          </p>
        </div>
      </Container>
    </section>
  );
}
