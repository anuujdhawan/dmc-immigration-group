"use client";

import { useState } from "react";

import { RCIP_FACTS } from "@/features/tools/canada-pnp";

export function RcipEligibilityTool() {
  const [checks, setChecks] = useState<Record<number, boolean>>({});

  const answered = Object.keys(checks).length;
  const met = Object.values(checks).filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="mb-1 font-display text-xl font-bold text-ink">RCIP eligibility checklist</h3>
      <p className="mb-6 text-sm text-slate-500">
        The Rural Community Immigration Pilot (RCIP) replaced the closed Rural and Northern Immigration
        Pilot (RNIP). Work through each check below to see how close your profile is.
      </p>

      <ul className="space-y-3">
        {RCIP_FACTS.keyChecks.map((check, index) => (
          <li
            key={check.label}
            className={`rounded-xl border p-4 transition ${
              checks[index] ? "border-brand-200 bg-brand-50" : "border-slate-200 bg-white"
            }`}
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={checks[index] ?? false}
                onChange={(e) => setChecks((prev) => ({ ...prev, [index]: e.target.checked }))}
                className="mt-0.5 size-4 accent-[var(--ee-400)]"
              />
              <span>
                <span className="block text-sm font-bold text-ink">{check.label}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-slate-600">{check.description}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-bold text-ink">Your progress</h4>
          <span className="text-2xl font-black text-brand-700">
            {met}/{RCIP_FACTS.keyChecks.length}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          {met === RCIP_FACTS.keyChecks.length
            ? "You appear to cover the core RCIP checks. Each community sets its own process — confirm the details with a participating community before applying."
            : "This is a self-assessment only. A DMC consultant can review your full profile — including the community-recommendation process — in a free consultation."}
        </p>
        <p className="mt-3 text-xs text-slate-500">
          Informational estimate only — meeting these checks does not guarantee a recommendation or
          nomination. Last verified: {RCIP_FACTS.lastVerified}. Official source:{" "}
          <a href={RCIP_FACTS.officialUrl} target="_blank" rel="noopener noreferrer" className="underline">
            canada.ca — RCIP
          </a>
        </p>
      </div>
    </div>
  );
}
