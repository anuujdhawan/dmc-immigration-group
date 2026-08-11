"use client";

import { useState, useCallback } from "react";

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

export function FSW67Calculator() {
  const [factors, setFactors] = useState({
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

  const calculate = () => {
    setSubmitted(true);
  };

  const reset = () => {
    setFactors({ age: "", education: "", experience: "", language: "", secondLanguage: "", employment: "", adaptability: "" });
    setSubmitted(false);
  };

  const scores = submitted
    ? [
        { label: "Age", max: 12, points: AGE_POINTS[factors.age] ?? 0 },
        { label: "Education", max: 25, points: EDUCATION_POINTS[factors.education] ?? 0 },
        { label: "Work Experience", max: 15, points: EXPERIENCE_POINTS[factors.experience] ?? 0 },
        { label: "First Official Language", max: 34, points: LANGUAGE_POINTS[factors.language] ?? 0 },
        { label: "Second Official Language", max: 22, points: SECOND_LANG_POINTS[factors.secondLanguage] ?? 0 },
        { label: "Arranged Employment", max: 10, points: EMPLOYMENT_POINTS[factors.employment] ?? 0 },
        { label: "Adaptability", max: 10, points: ADAPTABILITY_POINTS[factors.adaptability] ?? 0 },
      ]
    : [];

  const total = scores.reduce((sum, s) => sum + s.points, 0);
  const eligible = total >= 67;

  const allFilled = Object.values(factors).every((v) => v !== "");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="mb-1 font-display text-xl font-bold text-ink">FSW 67-Point Calculator</h3>
      <p className="mb-6 text-sm text-slate-500">
        Federal Skilled Worker selection-factor grid. You need at least 67 out of 100 points to be eligible.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Age (points: max 12)</label>
          <select value={factors.age} onChange={(e) => update("age", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select age range</option>
            {Object.keys(AGE_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Education (points: max 25)</label>
          <select value={factors.education} onChange={(e) => update("education", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select education level</option>
            {Object.keys(EDUCATION_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Work Experience (points: max 15)</label>
          <select value={factors.experience} onChange={(e) => update("experience", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select experience</option>
            {Object.keys(EXPERIENCE_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">First Official Language (points: max 34)</label>
          <select value={factors.language} onChange={(e) => update("language", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select CLB level</option>
            {Object.keys(LANGUAGE_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Second Official Language (points: max 22)</label>
          <select value={factors.secondLanguage} onChange={(e) => update("secondLanguage", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select CLB level</option>
            {Object.keys(SECOND_LANG_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Arranged Employment (points: max 10)</label>
          <select value={factors.employment} onChange={(e) => update("employment", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select</option>
            {Object.keys(EMPLOYMENT_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Adaptability (points: max 10)</label>
          <select value={factors.adaptability} onChange={(e) => update("adaptability", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select</option>
            {Object.keys(ADAPTABILITY_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={calculate} disabled={!allFilled} className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50">
          Calculate Score
        </button>
        <button onClick={reset} className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
          Reset
        </button>
      </div>

      {submitted && (
        <div className={`mt-6 rounded-xl border p-4 ${eligible ? "border-brand-200 bg-brand-50" : "border-amber-200 bg-amber-50"}`}>
          <div className="mb-3 flex items-baseline justify-between">
            <h4 className="text-sm font-bold text-ink">Your Score</h4>
            <span className={`text-3xl font-black ${eligible ? "text-brand-700" : "text-amber-700"}`}>{total}/100</span>
          </div>

          <div className="mb-3 space-y-1.5">
            {scores.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{s.label}</span>
                <span className="font-medium text-ink">{s.points} / {s.max}</span>
              </div>
            ))}
          </div>

          <div className={`rounded-lg p-3 text-sm font-semibold ${eligible ? "bg-brand-600 text-white" : "bg-amber-500 text-white"}`}>
            {eligible
              ? "You meet the 67-point threshold. You may be eligible to enter the Express Entry pool under the Federal Skilled Worker program."
              : "You do not currently meet the 67-point threshold. Consider improving language scores, education, or work experience."}
          </div>

          <p className="mt-3 text-xs text-slate-500">
            This is an informational estimate only. The 67-point grid is used to assess FSW eligibility — it is different from the CRS ranking score. Rules may change. Last verified: August 2026. Official source: <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html" target="_blank" rel="noopener noreferrer" className="underline">canada.ca</a>
          </p>
        </div>
      )}
    </div>
  );
}
