"use client";

import { Gauge, Users } from "lucide-react";
import { useCallback, useState } from "react";

import {
  ProgressBar,
  ScoreGauge,
  ToolBadge,
  ToolCard,
  ToolCheck,
  ToolField,
  ToolNote,
  ToolResult,
  ToolSelect,
  ToolSlider,
  ToolStat,
} from "@/components/calculators/tool-kit";

type EducationLevel =
  | "less-secondary"
  | "secondary"
  | "one-year"
  | "two-year"
  | "bachelor"
  | "two-credentials"
  | "master"
  | "doctoral";

type CLBLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type CanadianExperience = 0 | 1 | 2 | 3 | 4 | 5;

interface CRSInputs {
  age: number;
  education: EducationLevel;
  clbListening: CLBLevel;
  clbSpeaking: CLBLevel;
  clbReading: CLBLevel;
  clbWriting: CLBLevel;
  canadianExperience: CanadianExperience;
  hasSpouse: boolean;
  spouseEducation: EducationLevel;
  spouseCLB: CLBLevel;
  spouseExperience: CanadianExperience;
}

function agePoints(age: number): number {
  if (age < 18) return 0;
  if (age <= 20) return 99;
  if (age <= 29) return 100;
  if (age === 30) return 95;
  if (age === 31) return 90;
  if (age === 32) return 85;
  if (age === 33) return 80;
  if (age === 34) return 75;
  if (age === 35) return 70;
  if (age === 36) return 65;
  if (age === 37) return 60;
  if (age === 38) return 55;
  if (age === 39) return 50;
  if (age === 40) return 45;
  if (age === 41) return 35;
  if (age === 42) return 25;
  if (age === 43) return 15;
  if (age === 44) return 5;
  return 0;
}

function educationPoints(level: EducationLevel): number {
  const map: Record<EducationLevel, number> = {
    "less-secondary": 0,
    secondary: 30,
    "one-year": 90,
    "two-year": 98,
    bachelor: 120,
    "two-credentials": 128,
    master: 135,
    doctoral: 140,
  };
  return map[level];
}

function clbPoints(clb: CLBLevel): number {
  const map: Record<CLBLevel, number> = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 6, 6: 9, 7: 17, 8: 23, 9: 31, 10: 34, 11: 34, 12: 34,
  };
  return map[clb];
}

function canadianExperiencePoints(years: CanadianExperience): number {
  const map: Record<CanadianExperience, number> = {
    0: 0, 1: 40, 2: 53, 3: 64, 4: 72, 5: 80,
  };
  return map[years];
}

function skillTransferability(inputs: CRSInputs): number {
  let total = 0;

  // Education + language
  const avgCLB = Math.round((inputs.clbListening + inputs.clbSpeaking + inputs.clbReading + inputs.clbWriting) / 4);
  const eduPoints = educationPoints(inputs.education);
  if (eduPoints >= 98 && avgCLB >= 9) total += 50;
  else if (eduPoints >= 90 && avgCLB >= 7) total += 25;
  else if (eduPoints >= 30 && avgCLB >= 9) total += 25;

  // Education + Canadian work experience
  if (eduPoints >= 98 && inputs.canadianExperience >= 2) total += 50;
  else if (eduPoints >= 90 && inputs.canadianExperience >= 1) total += 25;
  else if (eduPoints >= 30 && inputs.canadianExperience >= 1) total += 25;

  // Foreign work experience + language
  if (inputs.canadianExperience === 0) {
    // No Canadian experience, so foreign experience is not scored here
  } else if (avgCLB >= 9) {
    total += 25;
  }

  // Canadian + foreign work experience (if applicable through language combo)
  if (inputs.canadianExperience >= 1 && avgCLB >= 9) total += 25;

  return Math.min(total, 100);
}

function additionalFactors(inputs: CRSInputs): number {
  let total = 0;
  // Provincial nomination: up to 600 (not included in basic calculator)
  // Valid job offer: up to 200 (not included)
  // Canadian education: up to 30
  const eduPoints = educationPoints(inputs.education);
  if (eduPoints >= 90) total += 15; // At least one year post-secondary
  if (eduPoints >= 128) total += 30; // Two or more credentials OR master's+
  // French language: up to 50 (not included for simplicity)
  // Sibling in Canada: up to 15 (not included)
  // Arranged employment: not included
  return total;
}

function calculateCRS(inputs: CRSInputs): number {
  const core = agePoints(inputs.age) + educationPoints(inputs.education)
    + clbPoints(inputs.clbListening) + clbPoints(inputs.clbSpeaking)
    + clbPoints(inputs.clbReading) + clbPoints(inputs.clbWriting)
    + canadianExperiencePoints(inputs.canadianExperience);

  let spouse = 0;
  if (inputs.hasSpouse) {
    spouse = educationPoints(inputs.spouseEducation) / 10
      + clbPoints(inputs.spouseCLB) / 10
      + canadianExperiencePoints(inputs.spouseExperience) / 10;
    spouse = Math.round(spouse);
  }

  const transferability = skillTransferability(inputs);
  const additional = additionalFactors(inputs);

  return core + spouse + transferability + additional;
}

const EDUCATION_OPTIONS: { value: EducationLevel; label: string }[] = [
  { value: "less-secondary", label: "Less than secondary school" },
  { value: "secondary", label: "Secondary school (high school)" },
  { value: "one-year", label: "One-year diploma or certificate" },
  { value: "two-year", label: "Two-year diploma or certificate" },
  { value: "bachelor", label: "Bachelor's degree (3+ years)" },
  { value: "two-credentials", label: "Two or more credentials" },
  { value: "master", label: "Master's degree" },
  { value: "doctoral", label: "Doctoral degree (PhD)" },
];

const CLB_OPTIONS: { value: CLBLevel; label: string }[] = [
  { value: 0, label: "CLB 0–3 (below minimum)" },
  { value: 5, label: "CLB 5 (IELTS 5.0)" },
  { value: 6, label: "CLB 6 (IELTS 5.5)" },
  { value: 7, label: "CLB 7 (IELTS 6.0)" },
  { value: 8, label: "CLB 8 (IELTS 6.5)" },
  { value: 9, label: "CLB 9 (IELTS 7.0)" },
  { value: 10, label: "CLB 10+ (IELTS 8.0+)" },
];

const EXPERIENCE_OPTIONS: { value: CanadianExperience; label: string }[] = [
  { value: 0, label: "No Canadian experience" },
  { value: 1, label: "1 year" },
  { value: 2, label: "2 years" },
  { value: 3, label: "3 years" },
  { value: 4, label: "4 years" },
  { value: 5, label: "5+ years" },
];

export function CRSCalculator({ className }: { className?: string }) {
  const [inputs, setInputs] = useState<CRSInputs>({
    age: 30,
    education: "bachelor",
    clbListening: 7,
    clbSpeaking: 7,
    clbReading: 7,
    clbWriting: 7,
    canadianExperience: 0,
    hasSpouse: false,
    spouseEducation: "bachelor",
    spouseCLB: 7,
    spouseExperience: 0,
  });

  const update = useCallback(<K extends keyof CRSInputs>(key: K, value: CRSInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const score = calculateCRS(inputs);
  const core = agePoints(inputs.age) + educationPoints(inputs.education)
    + clbPoints(inputs.clbListening) + clbPoints(inputs.clbSpeaking)
    + clbPoints(inputs.clbReading) + clbPoints(inputs.clbWriting)
    + canadianExperiencePoints(inputs.canadianExperience);
  const spouse = inputs.hasSpouse
    ? Math.round(educationPoints(inputs.spouseEducation) / 10 + clbPoints(inputs.spouseCLB) / 10 + canadianExperiencePoints(inputs.spouseExperience) / 10)
    : 0;
  const transferability = skillTransferability(inputs);
  const additional = additionalFactors(inputs);

  return (
    <ToolCard
      className={className}
      icon={Gauge}
      eyebrow="Canada · Express Entry"
      title="CRS Calculator"
      lede="Estimate your Comprehensive Ranking System score — core factors, spouse factors, skill transferability and additional points."
    >
      <div className="grid gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        <ToolSlider
          label="Age"
          value={inputs.age}
          min={18}
          max={50}
          onChange={(age) => update("age", age)}
          hint={`${agePoints(inputs.age)} points`}
        />
        <ToolField label="Highest education" hint={`${educationPoints(inputs.education)} pts`}>
          <ToolSelect
            value={inputs.education}
            onChange={(e) => update("education", e.target.value as EducationLevel)}
            options={EDUCATION_OPTIONS}
          />
        </ToolField>
        <ToolField
          label="Canadian work experience"
          hint={`${canadianExperiencePoints(inputs.canadianExperience)} pts`}
        >
          <ToolSelect
            value={String(inputs.canadianExperience)}
            onChange={(e) => update("canadianExperience", Number(e.target.value) as CanadianExperience)}
            options={EXPERIENCE_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))}
          />
        </ToolField>
      </div>

      {/* Language */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px flex-1 bg-gradient-to-r from-brand-200 to-transparent" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
            First official language · English / French
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-brand-200 to-transparent" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {([
            ["clbListening", "Listening"],
            ["clbSpeaking", "Speaking"],
            ["clbReading", "Reading"],
            ["clbWriting", "Writing"],
          ] as const).map(([key, label]) => (
            <ToolField key={key} label={label} hint={`${clbPoints(inputs[key])} pts`}>
              <ToolSelect
                value={String(inputs[key])}
                onChange={(e) => update(key, Number(e.target.value) as CLBLevel)}
                options={CLB_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))}
              />
            </ToolField>
          ))}
        </div>
      </div>

      {/* Spouse */}
      <div className="mt-8">
        <ToolCheck
          checked={inputs.hasSpouse}
          onChange={(checked) => update("hasSpouse", checked)}
          label="Include spouse or common-law partner"
          description="Their education, language and Canadian experience can add a small number of points."
        />
        {inputs.hasSpouse ? (
          <div className="mt-4 rounded-3xl border border-brand-100 bg-brand-50/40 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Users aria-hidden="true" className="size-4 text-brand-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                Spouse factors
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <ToolField label="Spouse education">
                <ToolSelect
                  value={inputs.spouseEducation}
                  onChange={(e) => update("spouseEducation", e.target.value as EducationLevel)}
                  options={EDUCATION_OPTIONS}
                />
              </ToolField>
              <ToolField label="Spouse language (CLB)">
                <ToolSelect
                  value={String(inputs.spouseCLB)}
                  onChange={(e) => update("spouseCLB", Number(e.target.value) as CLBLevel)}
                  options={CLB_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))}
                />
              </ToolField>
              <ToolField label="Spouse Canadian experience">
                <ToolSelect
                  value={String(inputs.spouseExperience)}
                  onChange={(e) => update("spouseExperience", Number(e.target.value) as CanadianExperience)}
                  options={EXPERIENCE_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))}
                />
              </ToolField>
            </div>
          </div>
        ) : null}
      </div>

      {/* Score */}
      <div className="mt-8 grid items-center gap-6 lg:grid-cols-[auto_1fr]">
        <div className="grid place-items-center rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-6">
          <ScoreGauge value={score} max={1200} label="CRS points" tone={score >= 500 ? "pass" : "neutral"} />
        </div>
        <ToolResult
          tone={score >= 500 ? "pass" : "neutral"}
          status={
            score >= 500
              ? "Strong competitive range"
              : "Estimated ranking score"
          }
          score={score}
          scoreLabel="estimated CRS"
        >
          <p className="text-sm leading-relaxed text-slate-600">
            This estimate is based on core factors, spouse factors, skill transferability and
            Canadian-education points. A provincial nomination can add up to{" "}
            <strong className="text-brand-700">600 additional points</strong> — that alone can move a
            profile from the edge of the pool into invitation range.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">Invitation competitiveness</span>
            <div className="flex-1">
              <ProgressBar value={Math.min(score, 600)} max={600} />
            </div>
          </div>
        </ToolResult>
      </div>

      {/* Breakdown */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ToolStat label="Core factors" value={core} hint="Age · education · language · experience" accent />
        <ToolStat label="Spouse factors" value={spouse} hint="Included when a partner is added" />
        <ToolStat label="Skill transferability" value={transferability} hint="Education + language + experience" />
        <ToolStat label="Additional factors" value={additional} hint="Canadian-education bonus" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <ToolBadge tone="neutral">Estimated only</ToolBadge>
        <ToolBadge tone="neutral">Up to 600 PNP bonus</ToolBadge>
        <ToolBadge tone="neutral">Cut-offs vary by round</ToolBadge>
      </div>

      <ToolNote className="mt-5">
        This is an informational estimate only — actual CRS scoring is determined by IRCC and includes
        factors not covered here (valid job offers, French-language bonus, provincial nomination and
        sibling points). Scores and invitation cut-offs change between rounds.
      </ToolNote>
    </ToolCard>
  );
}
