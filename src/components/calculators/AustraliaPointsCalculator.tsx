"use client";

import { useState } from "react";

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

export function AustraliaPointsCalculator() {
  const [factors, setFactors] = useState({
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

  const scores = submitted
    ? [
        { label: "Age", max: 30, points: AGE_POINTS[factors.age] ?? 0 },
        { label: "English Language", max: 20, points: ENGLISH_POINTS[factors.english] ?? 0 },
        { label: "Other Language", max: 10, points: SECOND_LANG_POINTS[factors.secondLang] ?? 0 },
        { label: "Overseas Employment", max: 15, points: EMPLOYMENT_POINTS[factors.employment] ?? 0 },
        { label: "Australian Employment", max: 20, points: AUS_EMPLOYMENT_POINTS[factors.ausEmployment] ?? 0 },
        { label: "Education", max: 20, points: EDUCATION_POINTS[factors.education] ?? 0 },
        { label: "Nomination/Sponsorship", max: 15, points: NOMINATION_POINTS[factors.nomination] ?? 0 },
      ]
    : [];

  const total = scores.reduce((sum, s) => sum + s.points, 0);
  const allFilled = Object.values(factors).every((v) => v !== "");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="mb-1 font-display text-xl font-bold text-ink">Australia Points Calculator</h3>
      <p className="mb-6 text-sm text-slate-500">
        Points-tested skilled migration calculator for visas 189, 190 and 491. Minimum 65 points required.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Age (max 30)</label>
          <select value={factors.age} onChange={(e) => update("age", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select age range</option>
            {Object.keys(AGE_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">English Language (max 20)</label>
          <select value={factors.english} onChange={(e) => update("english", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select level</option>
            {Object.keys(ENGLISH_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Second Language (max 10)</label>
          <select value={factors.secondLang} onChange={(e) => update("secondLang", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select level</option>
            {Object.keys(SECOND_LANG_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Overseas Work Experience (max 15)</label>
          <select value={factors.employment} onChange={(e) => update("employment", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select experience</option>
            {Object.keys(EMPLOYMENT_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Australian Work Experience (max 20)</label>
          <select value={factors.ausEmployment} onChange={(e) => update("ausEmployment", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select experience</option>
            {Object.keys(AUS_EMPLOYMENT_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Education (max 20)</label>
          <select value={factors.education} onChange={(e) => update("education", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select education</option>
            {Object.keys(EDUCATION_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nomination / Sponsorship (max 15)</label>
          <select value={factors.nomination} onChange={(e) => update("nomination", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">Select</option>
            {Object.keys(NOMINATION_POINTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={() => setSubmitted(true)} disabled={!allFilled} className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50">
          Calculate Points
        </button>
        <button onClick={() => { setFactors({ age: "", english: "", secondLang: "", employment: "", ausEmployment: "", education: "", nomination: "" }); setSubmitted(false); }} className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
          Reset
        </button>
      </div>

      {submitted && (
        <div className={`mt-6 rounded-xl border p-4 ${total >= 65 ? "border-brand-200 bg-brand-50" : "border-amber-200 bg-amber-50"}`}>
          <div className="mb-3 flex items-baseline justify-between">
            <h4 className="text-sm font-bold text-ink">Your Points</h4>
            <span className={`text-3xl font-black ${total >= 65 ? "text-brand-700" : "text-amber-700"}`}>{total}</span>
          </div>

          <div className="mb-3 space-y-1.5">
            {scores.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{s.label}</span>
                <span className="font-medium text-ink">{s.points} / {s.max}</span>
              </div>
            ))}
          </div>

          <div className={`rounded-lg p-3 text-sm font-semibold ${total >= 65 ? "bg-brand-600 text-white" : "bg-amber-500 text-white"}`}>
            {total >= 65
              ? `You meet the 65-point minimum. With ${total} points you may be competitive for invitation rounds, depending on occupation, skills assessment and other requirements.`
              : "You do not currently meet the 65-point minimum threshold for points-tested skilled visas."}
          </div>

          <p className="mt-3 text-xs text-slate-500">
            This is an informational estimate only. Invitation rounds, occupation lists and points thresholds vary. Rules may change. Last verified: August 2026. Official source: <a href="https://immi.homeaffairs.gov.au/" target="_blank" rel="noopener noreferrer" className="underline">immi.homeaffairs.gov.au</a>
          </p>
        </div>
      )}
    </div>
  );
}
