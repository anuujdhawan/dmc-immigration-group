import { BadgeCheck, ExternalLink } from "lucide-react";

import { CONSULTANT_CREDENTIALS, CREDENTIALS } from "@/config/credentials";
import { MARKET_LABELS, type Market } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";

export function CredentialsSection({ market }: { market: Market }) {
  return (
    <section id="credentials" className="bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative flex min-h-[760px] flex-col overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-8 py-16 lg:px-16 lg:py-24">
          <div
            aria-hidden="true"
            className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          />
          <div className="relative mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
              Our Credentials
            </span>
            <span className="h-px w-8 bg-white/40" />
          </div>
          <h2 className="relative font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Credentials You Can Actually <span>Verify.</span>
          </h2>
          <p className="relative mt-6 max-w-md leading-relaxed text-white/75">
            Every credential links directly to an official register where applicable. No badges
            without an official source. Trust should be checkable — and our {MARKET_LABELS[market]} team stands behind it.
          </p>

          <div className="credential-proof-stack relative" aria-label="Our credential verification standard">
            <div className="credential-proof-card">
              <span className="credential-proof-icon">
                <i className="fa-solid fa-link" />
              </span>
              <div>
                <strong>Direct-register links</strong>
                <small>No badges without an official source.</small>
              </div>
            </div>
            <div className="credential-proof-card">
              <span className="credential-proof-icon">
                <i className="fa-solid fa-shield-halved" />
              </span>
              <div>
                <strong>Regulated representation</strong>
                <small>Country-specific licensing and accountability.</small>
              </div>
            </div>
            <div className="credential-proof-card">
              <span className="credential-proof-icon">
                <i className="fa-solid fa-scale-balanced" />
              </span>
              <div>
                <strong>Ethical case handling</strong>
                <small>Clear advice, documented steps, no false promises.</small>
              </div>
            </div>
            <div className="credential-proof-card">
              <span className="credential-proof-icon">
                <i className="fa-solid fa-file-circle-check" />
              </span>
              <div>
                <strong>Source trail kept current</strong>
                <small>We link the register, the issuer and the live status.</small>
              </div>
            </div>
          </div>

          <div className="relative mt-10 rounded-[24px] border border-white/10 bg-white/6 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="credential-trail-kicker text-[10px] font-bold uppercase tracking-[0.2em] text-brand-100/80">
                  Verification trail
                </p>
                <h3 className="credential-trail-intro mt-1 text-sm font-semibold text-white">
                  Every credential is checked against a live public source.
                </h3>
              </div>
              <span className="credential-trail-pill rounded-full border border-brand-300/20 bg-brand-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-100">
                Live links
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="credential-trail-card rounded-2xl border border-white/12 bg-white/88 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <p className="credential-trail-label text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700/80">
                  Issuing authority
                </p>
                <p className="credential-trail-copy mt-1 text-sm text-slate-700">Regulator or licensing body named on every card.</p>
              </div>
              <div className="credential-trail-card rounded-2xl border border-white/12 bg-white/88 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <p className="credential-trail-label text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700/80">
                  Register status
                </p>
                <p className="credential-trail-copy mt-1 text-sm text-slate-700">Verified, pending or subject to final confirmation.</p>
              </div>
              <div className="credential-trail-card rounded-2xl border border-white/12 bg-white/88 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <p className="credential-trail-label text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700/80">
                  Public route
                </p>
                <p className="credential-trail-copy mt-1 text-sm text-slate-700">Direct outbound link to the official register page.</p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
            <div className="credential-trust-card rounded-2xl border border-white/12 bg-white/88 px-4 py-3 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <p className="credential-trust-label text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700/80">
                Public record first
              </p>
              <p className="credential-trust-copy mt-1 text-sm text-slate-700">No badge appears without a live source.</p>
            </div>
            <div className="credential-trust-card rounded-2xl border border-white/12 bg-white/88 px-4 py-3 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <p className="credential-trust-label text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700/80">
                Country aware
              </p>
              <p className="credential-trust-copy mt-1 text-sm text-slate-700">Licensing is shown where it actually applies.</p>
            </div>
            <div className="credential-trust-card rounded-2xl border border-white/12 bg-white/88 px-4 py-3 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <p className="credential-trust-label text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700/80">
                No empty claims
              </p>
              <p className="credential-trust-copy mt-1 text-sm text-slate-700">We keep the language measurable and honest.</p>
            </div>
          </div>

          <div className="credential-assurance relative">
            <span className="credential-assurance-mark">
              <i className="fa-solid fa-fingerprint" />
            </span>
            <p>
              <strong className="text-white">Trust should be checkable.</strong>
              <br />
              Every claim below is presented with its issuing authority and verification route.
            </p>
          </div>
        </div>

        <div className="space-y-4 bg-slate-50 px-6 py-12 lg:px-12 lg:py-16">
          {CREDENTIALS.map((credential) => (
            <div
              key={credential.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
            >
              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <BadgeCheck aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink">{credential.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{credential.authority}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    VERIFIED
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand-700">
                  {credential.authority}
                </span>
                {credential.verifyUrl ? (
                  <a
                    href={credential.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-xs font-semibold text-brand-700 transition hover:text-brand-800"
                  >
                    Verify <ExternalLink aria-hidden="true" className="inline size-3" />
                  </a>
                ) : null}
              </div>
            </div>
          ))}

          <div className="grid gap-4 md:grid-cols-2">
            {CONSULTANT_CREDENTIALS.map((consultant) => (
              <div
                key={consultant.registration}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{consultant.name}</h3>
                  <p className="text-sm text-slate-500">
                    {consultant.role} · {consultant.registration}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                    Status subject to final confirmation
                  </p>
                </div>
                <a
                  href={consultant.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-brand-700 transition hover:bg-slate-50"
                >
                  Verify on {consultant.registerName}
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500">
            Register links open the official public register of each regulator. Details shown here
            are subject to final client confirmation before launch.
          </p>
          <div className="text-center">
            <a
              href={marketHref(market, "/credentials")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
            >
              View full credentials
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
