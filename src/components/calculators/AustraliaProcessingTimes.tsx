"use client";

import { useState } from "react";

import {
  AUSTRALIA_PROCESSING_LAST_VERIFIED,
  AUSTRALIA_PROCESSING_PAGE_URL,
  AUSTRALIA_PROCESSING_TIMES,
} from "@/features/tools/australia-data";

export function AustraliaProcessingTimes() {
  const [selected, setSelected] = useState<string>("189");
  const visa = AUSTRALIA_PROCESSING_TIMES.find((v) => v.code === selected) ?? AUSTRALIA_PROCESSING_TIMES[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="mb-1 font-display text-xl font-bold text-ink">Australia processing times</h3>
      <p className="mb-6 text-sm text-slate-500">
        Indicative global processing-time bands published by the Department of Home Affairs. Times vary by
        case complexity, completeness of documents and your country of residence.
      </p>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">Visa subclass</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {AUSTRALIA_PROCESSING_TIMES.map((v) => (
            <option key={v.code} value={v.code}>
              {v.code} — {v.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {visa.bands.map((band) => (
          <div key={band.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <span className="text-sm text-slate-600">{band.label}</span>
            <span className="text-lg font-bold text-ink">{band.range}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-slate-500">
        Informational estimate only — processing times change and are not a promise of outcome. Last
        verified: {AUSTRALIA_PROCESSING_LAST_VERIFIED}. Official source:{" "}
        <a href={AUSTRALIA_PROCESSING_PAGE_URL} target="_blank" rel="noopener noreferrer" className="underline">
          immi.homeaffairs.gov.au — processing times
        </a>
      </p>
    </div>
  );
}
