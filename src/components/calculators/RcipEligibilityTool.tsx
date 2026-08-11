"use client";

import { Leaf } from "lucide-react";
import { useState } from "react";

import {
  ProgressBar,
  ScoreGauge,
  ToolCard,
  ToolCheck,
  ToolNote,
  ToolResult,
} from "@/components/calculators/tool-kit";
import { RCIP_FACTS } from "@/features/tools/canada-pnp";

export function RcipEligibilityTool() {
  const [checks, setChecks] = useState<Record<number, boolean>>({});

  const answered = Object.keys(checks).length;
  const met = Object.values(checks).filter(Boolean).length;
  const total = RCIP_FACTS.keyChecks.length;
  const allMet = met === total;

  return (
    <ToolCard
      icon={Leaf}
      eyebrow="Canada · Rural & Northern"
      title="RCIP Eligibility Checklist"
      lede="The Rural Community Immigration Pilot (RCIP) replaced the closed Rural and Northern Immigration Pilot (RNIP). Work through each check to see how close your profile is."
    >
      <ul className="space-y-3">
        {RCIP_FACTS.keyChecks.map((check, index) => (
          <li key={check.label}>
            <ToolCheck
              checked={checks[index] ?? false}
              onChange={(checked) => setChecks((prev) => ({ ...prev, [index]: checked }))}
              label={check.label}
              description={check.description}
            />
          </li>
        ))}
      </ul>

      <div className="mt-7 grid items-center gap-6 lg:grid-cols-[auto_1fr]">
        <div className="grid place-items-center rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-6">
          <ScoreGauge value={met} max={total} label={`of ${total} checks`} tone={allMet ? "pass" : answered > 0 ? "warn" : "neutral"} />
        </div>
        <ToolResult
          tone={allMet ? "pass" : answered > 0 ? "warn" : "neutral"}
          status={
            answered === 0
              ? "Start the self-assessment"
              : allMet
                ? "You appear to cover the core RCIP checks"
                : `${total - met} check${total - met === 1 ? "" : "s"} still to review`
          }
          score={`${met}/${total}`}
          scoreLabel="checks met"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">Overall progress</span>
            <div className="flex-1">
              <ProgressBar value={met} max={total} tone={allMet ? "brand" : "amber"} />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            {allMet
              ? "Each community sets its own process — confirm the details with a participating community before applying."
              : "This is a self-assessment only. A DMC consultant can review your full profile — including the community-recommendation process — in a free consultation."}
          </p>
        </ToolResult>
      </div>

      <ToolNote className="mt-6">
        Informational estimate only — meeting these checks does not guarantee a recommendation or
        nomination. Last verified: {RCIP_FACTS.lastVerified}. Official source:{" "}
        <a
          href={RCIP_FACTS.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          canada.ca — RCIP
        </a>
      </ToolNote>
    </ToolCard>
  );
}
