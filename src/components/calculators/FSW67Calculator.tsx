"use client";

import { ClipboardCheck } from "lucide-react";
import { useCallback, useState } from "react";

import {
  ProgressBar,
  ScoreGauge,
  ToolBadge,
  ToolButton,
  ToolCard,
  ToolField,
  ToolNote,
  ToolResult,
  ToolSelect,
} from "@/components/calculators/tool-kit";

// FSW 67-point grid factors and their max points
const AGE_POINTS: Record<string, number> = {
  "18-35": 12, "36": 11, "37": 10, "38": 9, "39": 8, "40": 7, "41": 6, "42": 5, "43": 4, "44": 3, "45": 2, "46": 1, "47+": 0,
};

const EDUCATION_POINTS: Record<string, number> = {
  "PhD": 25, "Masters": 23, "Two or more post-secondary": 22, "Bachelors": 21, "Two-year post-secondary": 19, "One-year post-secondary": 15, "High school": 5,
};

const EXPERIENCE_POINTS: Record<string, number> = {
  "5+ years": 15, "4 years": 13, "3 years": 11, "2 years": 9, "1 year": 7, "None": 0,
};

const LANGUAGE_POINTS: Record<string, number> = {
  "CLB 10+ (first)": 34, "CLB 9 (first)": 31, "CLB 8 (first)": 29, "CLB 7 (first)": 23, "CLB 6 (first)": 17, "CLB 5 (first)": 9, "CLB 4 (first)": 6, "Below CLB 4 (first)": 0,
};

const SECOND_LANG_POINTS: Record<string, number> = {
  "CLB 9+ (second)": 22, "CLB 8 (second)": 19, "CLB 7 (second)": 16, "CLB 6 (second)": 8, "CLB 5 (second)": 6, "CLB 4 (second)": 3, "None/Below CLB 4": 0,
};

const EMPLOYMENT_POINTS: Record<string, number> = {
  "Arranged employment with LMIA": 10, "No arranged employment": 0,
};

const ADAPTABILITY_POINTS: Record<string, number> = {
  "Spouse language CLB 4+": 5, "Past study in Canada": 5, "Past work in Canada": 10, "Arranged employment": 5, "Provincial nomination": 0, "None": 0,
};

type FSWFactors = {
  age: string;
  education: string;
  experience: string;
  language: string;
  secondLanguage: string;
  employment: string;
  adaptability: string;
};

const FIELDS: { key: keyof FSWFactors; label: string; max: number; data: Record<string, number>; empty: string }[] = [
  { key: "age", label: "Age", max: 12, data: AGE_POINTS, empty: "Select age range" },
  { key: "education", label: "Education", max: 25, data: EDUCATION_POINTS, empty: "Select education level" },
  { key: "experience", label: "Work experience", max: 15, data: EXPERIENCE_POINTS, empty: "Select experience" },
  { key: "language", label: "First official language", max: 34, data: LANGUAGE_POINTS, empty: "Select CLB level" },
  { key: "secondLanguage", label: "Second official language", max: 22, data: SECOND_LANG_POINTS, empty: "Select CLB level" },
  { key: "employment", label: "Arranged employment", max: 10, data: EMPLOYMENT_POINTS, empty: "Select" },
  { key: "adaptability", label: "Adaptability", max: 10, data: ADAPTABILITY_POINTS, empty: "Select" },
];

export function FSW67Calculator() {
  const [factors, setFactors] = useState<FSWFactors>({
    age: "",
    education: "",
    experience: "",
    language: "",
    secondLanguage: "",
    employment: "",
    adaptability: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback((key: string, value: string) => {
    setFactors((prev) => ({ ...prev, [key]: value }));
    setSubmitted(false);
  }, []);

  const reset = () => {
    setFactors({ age: "", education: "", experience: "", language: "", secondLanguage: "", employment: "", adaptability: "" });
    setSubmitted(false);
  };

  const scores = FIELDS.map((f) => ({
    label: f.label,
    max: f.max,
    points: f.data[factors[f.key]] ?? 0,
  }));

  const total = scores.reduce((sum, s) => sum + s.points, 0);
  const eligible = total >= 67;
  const allFilled = Object.values(factors).every((v) => v !== "");

  return (
    <ToolCard
      icon={ClipboardCheck}
      eyebrow="Canada · Federal Skilled Worker"
      title="FSW 67-Point Calculator"
      lede="Check the Federal Skilled Worker selection-factor grid — a separate eligibility test from the CRS ranking score. You need at least 67 of 100 points."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <ToolField key={field.key} label={field.label} hint={`max ${field.max} pts`}>
            <ToolSelect
              value={factors[field.key]}
              onChange={(e) => update(field.key, e.target.value)}
              chip={`${field.data[factors[field.key]] ?? 0} pts`}
              options={[{ value: "", label: field.empty }, ...Object.keys(field.data).map((k) => ({ value: k, label: k }))]}
            />
          </ToolField>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <ToolButton onClick={() => setSubmitted(true)} disabled={!allFilled}>
          Calculate score
        </ToolButton>
        <ToolButton variant="secondary" onClick={reset}>
          Reset
        </ToolButton>
      </div>

      {submitted ? (
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[auto_1fr]">
          <div className="grid place-items-center rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-6">
            <ScoreGauge value={total} max={100} label="of 100" tone={eligible ? "pass" : "warn"} />
          </div>
          <ToolResult
            tone={eligible ? "pass" : "warn"}
            status={eligible ? "Meets the 67-point threshold" : "Below the 67-point threshold"}
            score={`${total}/100`}
            scoreLabel="selection factors"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">Progress to 67</span>
              <div className="flex-1">
                <ProgressBar value={total} max={100} tone={eligible ? "brand" : "amber"} />
              </div>
            </div>
            <ul className="space-y-2.5">
              {scores.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm"
                >
                  <span className="text-sm text-slate-600">{s.label}</span>
                  <span className="font-semibold tabular-nums text-ink">
                    {s.points} <span className="font-normal text-slate-400">/ {s.max}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div
              className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold text-white ${
                eligible ? "bg-gradient-to-r from-brand-600 to-brand-700" : "bg-gradient-to-r from-amber-500 to-amber-600"
              }`}
            >
              {eligible
                ? "You meet the 67-point threshold. You may be eligible to enter the Express Entry pool under the Federal Skilled Worker program."
                : "You do not currently meet the 67-point threshold. Consider improving language scores, education, or work experience."}
            </div>
          </ToolResult>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <ToolBadge tone={eligible && submitted ? "pass" : "neutral"}>Separate from CRS ranking</ToolBadge>
        <ToolBadge tone="neutral">Eligibility test only</ToolBadge>
      </div>

      <ToolNote className="mt-5">
        Informational estimate only — the 67-point grid assesses FSW eligibility and is different from
        the CRS ranking score. Rules may change. Last verified: August 2026. Official source:{" "}
        <a
          href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          canada.ca
        </a>
      </ToolNote>
    </ToolCard>
  );
}
