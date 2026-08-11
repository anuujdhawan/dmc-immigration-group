"use client";

import { Wallet } from "lucide-react";
import { useState } from "react";

import {
  CountUp,
  ToolBadge,
  ToolCard,
  ToolCheck,
  ToolField,
  ToolNote,
  ToolSelect,
  ToolStat,
} from "@/components/calculators/tool-kit";
import {
  AUSTRALIA_FEES_LAST_VERIFIED,
  AUSTRALIA_FEE_SCHEDULE_URL,
  AUSTRALIA_VISA_FEES,
} from "@/features/tools/australia-data";

const AED_PER_AUD = 2.4; // indicative; updated with sources

export function AustraliaFeeEstimator() {
  const [selected, setSelected] = useState<string>("189");
  const [includePartner, setIncludePartner] = useState(false);
  const [includeChild, setIncludeChild] = useState(false);

  const fee = AUSTRALIA_VISA_FEES.find((v) => v.code === selected) ?? AUSTRALIA_VISA_FEES[0];

  // Rough additional-applicant estimate: ~half the base for a partner, ~20% per child (16+).
  const partnerFee = includePartner ? Math.round(fee.baseFeeAud * 0.5) : 0;
  const childFee = includeChild ? Math.round(fee.baseFeeAud * 0.2) : 0;
  const totalAud = fee.baseFeeAud + partnerFee + childFee;
  const totalAed = Math.round(totalAud * AED_PER_AUD);

  return (
    <ToolCard
      icon={Wallet}
      eyebrow="Australia · Visa pricing"
      title="Australia Visa Fee Estimator"
      lede="Estimate the base Visa Application Charge (VAC) for the main applicant, with an indicative AED conversion. Additional applicants, health checks, skills assessments and levies are not included."
    >
      <ToolField label="Visa subclass" hint={`${fee.code} · ${fee.name}`}>
        <ToolSelect
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          chip={`AUD ${fee.baseFeeAud.toLocaleString()}`}
          options={AUSTRALIA_VISA_FEES.map((v) => ({ value: v.code, label: `${v.code} — ${v.name}` }))}
        />
      </ToolField>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ToolCheck
          checked={includePartner}
          onChange={setIncludePartner}
          label="Include partner (18+)"
          description={`≈ AUD ${partnerFee.toLocaleString()} added`}
        />
        <ToolCheck
          checked={includeChild}
          onChange={setIncludeChild}
          label="Include one dependent child (18+)"
          description={`≈ AUD ${childFee.toLocaleString()} added`}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-brand-50/70 p-6 md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
              Estimated total · main applicant
            </p>
            <div className="mt-2 font-display text-5xl font-black tabular-nums leading-none text-ink">
              <CountUp value={totalAud} /> <span className="text-2xl text-brand-700">AUD</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-500">
              ≈ AED <CountUp value={totalAed} /> <span className="text-xs text-slate-400">(indicative {AED_PER_AUD}/AUD)</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ToolBadge tone="neutral">Base VAC</ToolBadge>
            {includePartner ? <ToolBadge tone="pass">+ partner</ToolBadge> : null}
            {includeChild ? <ToolBadge tone="pass">+ child</ToolBadge> : null}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <ToolStat label="Main applicant" value={`AUD ${fee.baseFeeAud.toLocaleString()}`} accent />
          <ToolStat label="Partner (est.)" value={partnerFee ? `AUD ${partnerFee.toLocaleString()}` : "—"} />
          <ToolStat label="Child 18+ (est.)" value={childFee ? `AUD ${childFee.toLocaleString()}` : "—"} />
        </div>

        {fee.notes ? (
          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            <strong className="text-slate-600">Note:</strong> {fee.notes}
          </p>
        ) : null}
      </div>

      <ToolNote className="mt-6">
        Base VAC as of {AUSTRALIA_FEES_LAST_VERIFIED} (updated 1 July 2026 fee schedule). Partner and
        child figures are rough estimates — the exact additional applicant charge depends on the
        subclass and age at application. Credit-card surcharges (~1.4%) apply. Official schedule:{" "}
        <a
          href={AUSTRALIA_FEE_SCHEDULE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          immi.homeaffairs.gov.au
        </a>
      </ToolNote>
    </ToolCard>
  );
}
