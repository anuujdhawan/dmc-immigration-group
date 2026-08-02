import { BadgeCheck, ExternalLink } from "lucide-react";

import { CONSULTANT_CREDENTIALS, CREDENTIALS } from "@/config/credentials";
import type { Market } from "@/config/markets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";
import { marketHref } from "@/lib/routing/routes";

export function CredentialsSection({ market }: { market: Market }) {
  return (
    <SectionShell id="credentials" className="bg-brand-950">
      <Container>
        <SectionHeading
          dark
          eyebrow="Our Credentials"
          title="Credentials You Can Actually Verify"
          lede="Every credential links directly to an official register — the CICC in Canada and the OMARA in Australia. No badges without an official source. Trust should be checkable."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CREDENTIALS.map((credential) => (
            <li
              key={credential.id}
              className="flex flex-col rounded-card border border-aurora-border bg-aurora-panel p-6"
            >
              <BadgeCheck aria-hidden="true" className="mb-4 size-7 text-leaf-soft" />
              <h3 className="font-display text-base font-bold text-aurora-text">
                {credential.title}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-mega text-leaf-soft">
                {credential.authority}
              </p>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-aurora-muted">
                {credential.description}
              </p>
              {credential.verifyUrl ? (
                <a
                  href={credential.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-leaf-soft hover:text-white"
                >
                  Verify
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {CONSULTANT_CREDENTIALS.map((consultant) => (
            <div
              key={consultant.registration}
              className="flex flex-col gap-3 rounded-card border border-aurora-border bg-aurora-panel-strong p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-aurora-text">
                  {consultant.name}
                </h3>
                <p className="text-sm text-aurora-muted">
                  {consultant.role} · {consultant.registration}
                </p>
              </div>
              <a
                href={consultant.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-aurora-border px-4 py-2 text-xs font-bold text-leaf-soft hover:bg-aurora-panel-strong"
              >
                Verify on {consultant.registerName}
                <ExternalLink aria-hidden="true" className="size-3.5" />
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-aurora-muted">
          Register links open the official public register of each regulator. Details shown here
          are subject to final client confirmation before launch.
        </p>
        <div className="mt-6 text-center">
          <a
            href={marketHref(market, "/credentials")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-soft hover:text-white"
          >
            View full credentials
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </Container>
    </SectionShell>
  );
}
