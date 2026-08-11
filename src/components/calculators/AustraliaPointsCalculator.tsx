"use client";

import { Gauge } from "lucide-react";
import { useState } from "react";

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

const AGE_POINTS: Record<string, number> = {
  "18-24": 25, "25-32": 30, "33-39": 25, "40-44": 15, "45+": 0,
};

const ENGLISH_POINTS: Record<string, number> = {
  "Superior (IELTS 8+)": 20, "Proficient (IELTS 7+)": 10, "Competent (IELTS 6+)": 0, "Below Competent": 0,
};

const SECOND_LANG_POINTS: Record<string, number> = {
  "Superior": 10, "Proficient": 5, "Competent or below": 0,
};

const EMPLOYMENT_POINTS: Record<string, number> = {
  "8+ years (overseas)": 15, "5-7 years (overseas)": 10, "3-4 years (overseas)": 5, "1-2 years (overseas)": 0,
};

const AUS_EMPLOYMENT_POINTS: Record<string, number> = {
  "8+ years (in Australia)": 20, "5-7 years (in Australia)": 15, "3-4 years (in Australia)": 10, "1-2 years (in Australia)": 5, "None": 0,
};

const EDUCATION_POINTS: Record<string, number> = {
  "Doctorate (PhD)": 20, "Bachelors or Masters": 15, "Diploma/Trade": 10, "Certificate III/IV": 10, "Certificate I/II": 0, "None": 0,
};

const NOMINATION_POINTS: Record<string, number> = {
  "State/territory nomination (190)": 5, "Regional family/sponsorship (491)": 15, "None": 0,
};

type AustraliaFactors = {
  age: string;
  english: string;
  secondLang: string;
  employment: string;
  ausEmployment: string;
  education: string;
  nomination: string;
};

const FIELDS: { key: keyof AustraliaFactors; label: string; max: number; data: Record<string, number>; empty: string }[] = [
  { key: "age", label: "Age", max: 30, data: AGE_POINTS, empty: "Select age range" },
  { key: "english", label: "English language", max: 20, data: ENGLISH_POINTS, empty: "Select level" },
  { key: "secondLang", label: "Second language", max: 10, data: SECOND_LANG_POINTS, empty: "Select level" },
  { key: "employment", label: "Overseas work experience", max: 15, data: EMPLOYMENT_POINTS, empty: "Select experience" },
  { key: "ausEmployment", label: "Australian work experience", max: 20, data: AUS_EMPLOYMENT_POINTS, empty: "Select experience" },
  { key: "education", label: "Education", max: 20, data: EDUCATION_POINTS, empty: "Select education" },
  { key: "nomination", label: "Nomination / sponsorship", max: 15, data: NOMINATION_POINTS, empty: "Select" },
];

export function AustraliaPointsCalculator() {
  const [factors, setFactors] = useState<AustraliaFactors>({
    age: "",
    english: "",
    secondLang: "",
    employment: "",
    ausEmployment: "",
    education: "",
    nomination: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string) => {
    setFactors((prev) => ({ ...prev, [key]: value }));
    setSubmitted(false);
  };

  const reset = () => {
    setFactors({ age: "", english: "", secondLang: "", employment: "", ausEmployment: "", education: "", nomination: "" });
    setSubmitted(false);
  };

  const scores = FIELDS.map((f) => ({
    label: f.label,
    max: f.max,
    points: f.data[factors[f.key]] ?? 0,
  }));

  const total = scores.reduce((sum, s) => sum + s.points, 0);
  const meets = total >= 65;
  const allFilled = Object.values(factors).every((v) => v !== "");

  return (
    <ToolCard
      icon={Gauge}
      eyebrow="Australia · Points-tested migration"
      title="Australia Points Calculator"
      lede="Score your profile for the points-tested skilled visas — 189, 190 and 491 — against the 65-point minimum threshold."
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
          Calculate points
        </ToolButton>
        <ToolButton variant="secondary" onClick={reset}>
          Reset
        </ToolButton>
      </div>

      {submitted ? (
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[auto_1fr]">
          <div className="grid place-items-center rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-6">
            <ScoreGauge value={total} max={95} label="points" tone={meets ? "pass" : "warn"} />
          </div>
          <ToolResult
            tone={meets ? "pass" : "warn"}
            status={meets ? "Meets the 65-point minimum" : "Below the 65-point minimum"}
            score={total}
            scoreLabel="points"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">Progress to 65</span>
              <div className="flex-1">
                <ProgressBar value={total} max={65} tone={meets ? "brand" : "amber"} />
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
                meets ? "bg-gradient-to-r from-brand-600 to-brand-700" : "bg-gradient-to-r from-amber-500 to-amber-600"
              }`}
            >
              {meets
                ? `You meet the 65-point minimum. With ${total} points you may be competitive for invitation rounds, depending on occupation, skills assessment and other requirements.`
                : "You do not currently meet the 65-point minimum threshold for points-tested skilled visas."}
            </div>
          </ToolResult>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <ToolBadge tone={meets && submitted ? "pass" : "neutral"}>189 · 190 · 491</ToolBadge>
        <ToolBadge tone="neutral">Invitation rounds vary</ToolBadge>
        <ToolBadge tone="neutral">Occupation list applies</ToolBadge>
      </div>

      <ToolNote className="mt-5">
        Informational estimate only. Invitation rounds, occupation lists and points thresholds vary.
        Rules may change. Last verified: August 2026. Official source:{" "}
        <a
          href="https://immi.homeaffairs.gov.au/"
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
