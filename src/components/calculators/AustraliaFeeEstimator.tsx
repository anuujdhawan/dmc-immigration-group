"use client";

import { useState } from "react";

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="mb-1 font-display text-xl font-bold text-ink">Australia visa fee estimator</h3>
      <p className="mb-6 text-sm text-slate-500">
        Estimate the base Visa Application Charge (VAC) for the main applicant. Additional applicants,
        health checks, skills assessments and levies are not included.
      </p>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">Visa subclass</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {AUSTRALIA_VISA_FEES.map((v) => (
            <option key={v.code} value={v.code}>
              {v.code} — {v.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 space-y-2">
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={includePartner}
            onChange={(e) => setIncludePartner(e.target.checked)}
            className="size-4 accent-[var(--ee-400)]"
          />
          Include partner (18+)
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={includeChild}
            onChange={(e) => setIncludeChild(e.target.checked)}
            className="size-4 accent-[var(--ee-400)]"
          />
          Include one dependent child (18+)
        </label>
      </div>

      <div className={`rounded-xl border p-5 ${totalAud > 0 ? "border-brand-200 bg-brand-50" : "border-slate-200 bg-white"}`}>
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-bold text-ink">Estimated total (main applicant)</span>
          <span className="text-3xl font-black text-brand-700">AUD {totalAud.toLocaleString()}</span>
        </div>
        <p className="mt-1 text-right text-sm text-slate-500">
          ≈ AED {totalAed.toLocaleString()} (indicative rate {AED_PER_AUD}/AUD)
        </p>
        {fee.notes ? <p className="mt-2 text-xs text-slate-500">{fee.notes}</p> : null}
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Base VAC as of {AUSTRALIA_FEES_LAST_VERIFIED} (updated 1 July 2026 fee schedule). Partner and child
          figures are rough estimates — the exact additional applicant charge depends on the subclass and
          age at application. Credit-card surcharges (~1.4%) apply. Official schedule:{" "}
          <a href={AUSTRALIA_FEE_SCHEDULE_URL} target="_blank" rel="noopener noreferrer" className="underline">
            immi.homeaffairs.gov.au
          </a>
        </p>
      </div>
    </div>
  );
}
