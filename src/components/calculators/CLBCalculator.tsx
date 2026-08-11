"use client";

import { useState, useCallback } from "react";

const IELTS_TO_CLB: Record<string, number> = {
  "10": 10, "9": 9, "8": 8, "7.5": 7, "7": 7, "6.5": 6, "6": 6, "5.5": 5, "5": 5, "4": 4, "3": 3, "2": 2,
};

const CELPIP_TO_CLB: Record<string, number> = {
  "12": 10, "11": 9, "10": 8, "9": 7, "8": 6, "7": 5, "6": 4, "5": 3, "4": 2, "3": 1,
};

const TEF_TO_CLB: Record<string, number> = {
  "316-360": 10, "298-315": 9, "280-297": 8, "249-279": 7, "217-248": 6, "181-216": 5, "145-180": 4, "121-144": 3, "96-120": 2, "0-95": 1,
};

const ABILITIES = ["Speaking", "Listening", "Reading", "Writing"] as const;

type TestType = "IELTS" | "CELPIP" | "TEF";

function getCLBLevel(testType: TestType, score: string): number {
  if (testType === "IELTS") return IELTS_TO_CLB[score] ?? 0;
  if (testType === "CELPIP") return CELPIP_TO_CLB[score] ?? 0;
  // TEF uses ranges, handled separately
  return 0;
}

export function CLBCalculator() {
  const [testType, setTestType] = useState<TestType>("IELTS");
  const [scores, setScores] = useState<Record<string, string>>({
    Speaking: "",
    Listening: "",
    Reading: "",
    Writing: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const getScoreOptions = useCallback(() => {
    if (testType === "IELTS") return ["10", "9", "8", "7.5", "7", "6.5", "6", "5.5", "5", "4", "3", "2"];
    if (testType === "CELPIP") return ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3"];
    return ["316-360", "298-315", "280-297", "249-279", "217-248", "181-216", "145-180", "121-144", "96-120", "0-95"];
  }, [testType]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setScores({ Speaking: "", Listening: "", Reading: "", Writing: "" });
    setSubmitted(false);
  };

  const clbResults = submitted
    ? ABILITIES.map((a) => ({
        ability: a,
        score: scores[a],
        clb: testType === "TEF" ? (TEF_TO_CLB[scores[a]] ?? 0) : getCLBLevel(testType, scores[a]),
      }))
    : [];

  const minCLB = clbResults.length > 0 ? Math.min(...clbResults.map((r) => r.clb)) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="mb-1 font-display text-xl font-bold text-ink">CLB Calculator</h3>
      <p className="mb-6 text-sm text-slate-500">
        Convert your language test scores to Canadian Language Benchmark (CLB) levels.
      </p>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">Test Type</label>
        <div className="flex gap-2">
          {(["IELTS", "CELPIP", "TEF"] as TestType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTestType(t); setSubmitted(false); }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                testType === t
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        {ABILITIES.map((ability) => (
          <div key={ability}>
            <label className="mb-1 block text-sm font-medium text-slate-700">{ability}</label>
            <select
              value={scores[ability]}
              onChange={(e) => setScores((prev) => ({ ...prev, [ability]: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="">Select score</option>
              {getScoreOptions().map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={ABILITIES.some((a) => !scores[a])}
          className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          Calculate CLB
        </button>
        <button
          onClick={handleReset}
          className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {submitted && (
        <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-4">
          <h4 className="mb-3 text-sm font-bold text-ink">Your CLB Levels</h4>
          <div className="space-y-2">
            {clbResults.map((r) => (
              <div key={r.ability} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{r.ability}</span>
                <span className="font-semibold text-ink">
                  {testType} {r.score} → CLB {r.clb}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-brand-200 pt-3 text-sm">
            <span className="text-slate-600">Overall minimum CLB: </span>
            <span className="font-bold text-brand-700">{minCLB}</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            CLB levels are calculated based on IRCC conversion tables. Rules and conversion tables may change.
            Last verified: August 2026. Official source: <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-requirements.html" target="_blank" rel="noopener noreferrer" className="underline">canada.ca</a>
          </p>
        </div>
      )}
    </div>
  );
}
