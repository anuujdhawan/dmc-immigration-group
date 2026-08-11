"use client";

import { useState, useCallback } from "react";

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

  return (
    <div className={className ?? ""} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
        {/* Age */}
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--ee-950)", textTransform: "uppercase", letterSpacing: ".04em" }}>Age</span>
          <input
            type="range"
            min={18}
            max={50}
            value={inputs.age}
            onChange={(e) => update("age", Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--ee-400)" }}
          />
          <span style={{ fontSize: ".92rem", color: "var(--ee-700)" }}>{inputs.age} years — {agePoints(inputs.age)} pts</span>
        </label>

        {/* Education */}
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--ee-950)", textTransform: "uppercase", letterSpacing: ".04em" }}>Highest education</span>
          <select
            value={inputs.education}
            onChange={(e) => update("education", e.target.value as EducationLevel)}
            style={{ height: "48px", paddingInline: "14px", border: "1px solid var(--ee-line)", borderRadius: "14px", background: "#fff" }}
          >
            {EDUCATION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <span style={{ fontSize: ".88rem", color: "var(--ee-700)" }}>{educationPoints(inputs.education)} pts</span>
        </label>

        {/* Canadian Experience */}
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--ee-950)", textTransform: "uppercase", letterSpacing: ".04em" }}>Canadian work experience</span>
          <select
            value={inputs.canadianExperience}
            onChange={(e) => update("canadianExperience", Number(e.target.value) as CanadianExperience)}
            style={{ height: "48px", paddingInline: "14px", border: "1px solid var(--ee-line)", borderRadius: "14px", background: "#fff" }}
          >
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <span style={{ fontSize: ".88rem", color: "var(--ee-700)" }}>{canadianExperiencePoints(inputs.canadianExperience)} pts</span>
        </label>
      </div>

      {/* Language */}
      <div>
        <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--ee-950)", textTransform: "uppercase", letterSpacing: ".04em", display: "block", marginBottom: "10px" }}>
          First official language (English / French)
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
          {([
            ["clbListening", "Listening"],
            ["clbSpeaking", "Speaking"],
            ["clbReading", "Reading"],
            ["clbWriting", "Writing"],
          ] as const).map(([key, label]) => (
            <label key={key} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ fontSize: ".82rem", color: "var(--ee-700)" }}>{label}</span>
              <select
                value={inputs[key]}
                onChange={(e) => update(key, Number(e.target.value) as CLBLevel)}
                style={{ height: "44px", paddingInline: "12px", border: "1px solid var(--ee-line)", borderRadius: "12px", background: "#fff", fontSize: ".88rem" }}
              >
                {CLB_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>

      {/* Spouse toggle */}
      <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={inputs.hasSpouse}
          onChange={(e) => update("hasSpouse", e.target.checked)}
          style={{ width: "18px", height: "18px", accentColor: "var(--ee-400)" }}
        />
        <span style={{ fontSize: ".92rem", color: "var(--ee-950)" }}>Include spouse or common-law partner</span>
      </label>

      {/* Spouse factors */}
      {inputs.hasSpouse && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", padding: "18px", border: "1px solid var(--ee-line)", borderRadius: "18px", background: "rgba(244,249,241,.5)" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: ".82rem", color: "var(--ee-700)" }}>Spouse education</span>
            <select
              value={inputs.spouseEducation}
              onChange={(e) => update("spouseEducation", e.target.value as EducationLevel)}
              style={{ height: "44px", paddingInline: "12px", border: "1px solid var(--ee-line)", borderRadius: "12px", background: "#fff" }}
            >
              {EDUCATION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: ".82rem", color: "var(--ee-700)" }}>Spouse language (CLB)</span>
            <select
              value={inputs.spouseCLB}
              onChange={(e) => update("spouseCLB", Number(e.target.value) as CLBLevel)}
              style={{ height: "44px", paddingInline: "12px", border: "1px solid var(--ee-line)", borderRadius: "12px", background: "#fff" }}
            >
              {CLB_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: ".82rem", color: "var(--ee-700)" }}>Spouse Canadian experience</span>
            <select
              value={inputs.spouseExperience}
              onChange={(e) => update("spouseExperience", Number(e.target.value) as CanadianExperience)}
              style={{ height: "44px", paddingInline: "12px", border: "1px solid var(--ee-line)", borderRadius: "12px", background: "#fff" }}
            >
              {EXPERIENCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Score display */}
      <div style={{ textAlign: "center", padding: "28px", border: "1px solid rgba(53,142,26,.15)", borderRadius: "24px 62px 24px 24px", background: "linear-gradient(145deg, #e5f3df, #f4f9f1)" }}>
        <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--ee-500)", textTransform: "uppercase", letterSpacing: ".06em" }}>Estimated CRS Score</span>
        <div style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 700, color: "var(--ee-950)", lineHeight: 1.1, marginTop: "8px" }}>{score}</div>
        <p style={{ fontSize: ".88rem", color: "var(--ee-700)", marginTop: "8px", maxWidth: "480px", marginInline: "auto" }}>
          This is an estimate based on core factors. A provincial nomination can add up to 600 additional points. Actual CRS scoring may vary based on additional factors not covered here.
        </p>
      </div>

      {/* Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", fontSize: ".82rem" }}>
        <div style={{ padding: "14px", border: "1px solid var(--ee-line)", borderRadius: "14px", background: "#fff" }}>
          <strong style={{ display: "block", color: "var(--ee-500)", fontSize: ".72rem", textTransform: "uppercase" }}>Core factors</strong>
          <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--ee-950)" }}>
            {agePoints(inputs.age) + educationPoints(inputs.education) + clbPoints(inputs.clbListening) + clbPoints(inputs.clbSpeaking) + clbPoints(inputs.clbReading) + clbPoints(inputs.clbWriting) + canadianExperiencePoints(inputs.canadianExperience)}
          </span>
        </div>
        <div style={{ padding: "14px", border: "1px solid var(--ee-line)", borderRadius: "14px", background: "#fff" }}>
          <strong style={{ display: "block", color: "var(--ee-500)", fontSize: ".72rem", textTransform: "uppercase" }}>Spouse factors</strong>
          <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--ee-950)" }}>
            {inputs.hasSpouse ? Math.round(educationPoints(inputs.spouseEducation) / 10 + clbPoints(inputs.spouseCLB) / 10 + canadianExperiencePoints(inputs.spouseExperience) / 10) : 0}
          </span>
        </div>
        <div style={{ padding: "14px", border: "1px solid var(--ee-line)", borderRadius: "14px", background: "#fff" }}>
          <strong style={{ display: "block", color: "var(--ee-500)", fontSize: ".72rem", textTransform: "uppercase" }}>Skill transferability</strong>
          <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--ee-950)" }}>{skillTransferability(inputs)}</span>
        </div>
        <div style={{ padding: "14px", border: "1px solid var(--ee-line)", borderRadius: "14px", background: "#fff" }}>
          <strong style={{ display: "block", color: "var(--ee-500)", fontSize: ".72rem", textTransform: "uppercase" }}>Additional factors</strong>
          <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--ee-950)" }}>{additionalFactors(inputs)}</span>
        </div>
      </div>
    </div>
  );
}
