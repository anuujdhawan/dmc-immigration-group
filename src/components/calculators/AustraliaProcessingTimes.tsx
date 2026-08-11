"use client";

import { Clock3, Hourglass, Timer } from "lucide-react";
import { useState } from "react";

import { ToolCard, ToolField, ToolNote, ToolSelect } from "@/components/calculators/tool-kit";
import {
  AUSTRALIA_PROCESSING_LAST_VERIFIED,
  AUSTRALIA_PROCESSING_PAGE_URL,
  AUSTRALIA_PROCESSING_TIMES,
} from "@/features/tools/australia-data";

export function AustraliaProcessingTimes() {
  const [selected, setSelected] = useState<string>("189");
  const visa = AUSTRALIA_PROCESSING_TIMES.find((v) => v.code === selected) ?? AUSTRALIA_PROCESSING_TIMES[0];

  return (
    <ToolCard
      icon={Timer}
      eyebrow="Australia · Processing"
      title="Australia Processing Times"
      lede="Look up the indicative global processing-time bands Home Affairs publishes for each skilled visa subclass."
    >
      <ToolField label="Visa subclass" hint={`${visa.code} · ${visa.name}`}>
        <ToolSelect
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          options={AUSTRALIA_PROCESSING_TIMES.map((v) => ({ value: v.code, label: `${v.code} — ${v.name}` }))}
        />
      </ToolField>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {visa.bands.map((band) => {
          const is90 = band.label.startsWith("90%");
          const Icon = is90 ? Hourglass : Clock3;
          return (
            <div
              key={band.label}
              className="group relative overflow-hidden rounded-3xl border border-brand-100/80 bg-gradient-to-br from-white to-brand-50/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-600/10"
            >
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  is90 ? "from-brand-400 to-brand-600" : "from-brand-200 to-brand-400"
                }`}
              />
              <div className="flex items-center gap-3">
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-2xl text-white shadow-md ${
                    is90
                      ? "bg-gradient-to-br from-brand-500 to-brand-700 shadow-brand-600/25"
                      : "bg-gradient-to-br from-brand-400 to-brand-600 shadow-brand-600/20"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    {band.label}
                  </p>
                  <p className="mt-0.5 font-display text-2xl font-extrabold tabular-nums leading-tight text-ink">
                    {band.range}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 rounded-2xl border border-brand-100/80 bg-brand-50/50 px-4 py-3 text-xs leading-relaxed text-slate-500">
        Times vary by case complexity, completeness of documents and your country of residence.
        Home Affairs publishes these as “{visa.bands[0]?.label}” and “{visa.bands[1]?.label}” completed
        within the range, updated regularly.
      </p>

      <ToolNote className="mt-6">
        Informational estimate only — processing times change and are not a promise of outcome. Last
        verified: {AUSTRALIA_PROCESSING_LAST_VERIFIED}. Official source:{" "}
        <a
          href={AUSTRALIA_PROCESSING_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          immi.homeaffairs.gov.au — processing times
        </a>
      </ToolNote>
    </ToolCard>
  );
}
