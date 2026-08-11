"use client";

import { Languages } from "lucide-react";
import { useCallback, useState } from "react";

import {
  ScoreGauge,
  ToolBadge,
  ToolButton,
  ToolCard,
  ToolField,
  ToolNote,
  ToolResult,
  ToolSegmented,
  ToolSelect,
  ToolStat,
} from "@/components/calculators/tool-kit";

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
  const allFilled = ABILITIES.every((a) => scores[a]);

  return (
    <ToolCard
      icon={Languages}
      eyebrow="Canada · Language benchmarks"
      title="CLB Calculator"
      lede="Convert your IELTS, CELPIP or TEF test scores into Canadian Language Benchmark (CLB) levels across all four abilities."
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ToolSegmented
          label="Language test"
          value={testType}
          onChange={(value) => {
            setTestType(value);
            setSubmitted(false);
          }}
          options={(["IELTS", "CELPIP", "TEF"] as TestType[]).map((t) => ({ value: t, label: t }))}
        />
        {submitted ? (
          <ToolBadge tone={minCLB >= 7 ? "pass" : "warn"}>
            {minCLB >= 7 ? "Meets CLB 7 minimum" : "Below CLB 7 minimum"}
          </ToolBadge>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ABILITIES.map((ability) => (
          <ToolField key={ability} label={ability}>
            <ToolSelect
              value={scores[ability]}
              onChange={(e) => setScores((prev) => ({ ...prev, [ability]: e.target.value }))}
              options={[{ value: "", label: "Select score" }, ...getScoreOptions().map((s) => ({ value: s, label: s }))]}
            />
          </ToolField>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <ToolButton onClick={handleSubmit} disabled={!allFilled}>
          Calculate CLB
        </ToolButton>
        <ToolButton variant="secondary" onClick={handleReset}>
          Reset
        </ToolButton>
      </div>

      {submitted ? (
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[auto_1fr]">
          <div className="grid place-items-center rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-6">
            <ScoreGauge value={minCLB} max={12} label="min CLB" tone={minCLB >= 7 ? "pass" : "warn"} />
          </div>
          <ToolResult
            tone={minCLB >= 7 ? "pass" : "warn"}
            status={minCLB >= 7 ? "Meets the CLB 7 Express Entry minimum" : "Below the CLB 7 Express Entry minimum"}
            score={`CLB ${minCLB}`}
            scoreLabel="overall minimum"
          >
            <ul className="space-y-2.5">
              {clbResults.map((r) => (
                <li
                  key={r.ability}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm"
                >
                  <span className="text-sm font-medium text-slate-600">{r.ability}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">
                      {testType} {r.score}
                    </span>
                    <ToolBadge tone={r.clb >= 7 ? "pass" : r.clb > 0 ? "warn" : "neutral"}>
                      CLB {r.clb}
                    </ToolBadge>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ToolStat label="Highest ability" value={`CLB ${Math.max(...clbResults.map((r) => r.clb))}`} />
              <ToolStat label="Lowest ability" value={`CLB ${minCLB}`} accent />
            </div>
          </ToolResult>
        </div>
      ) : null}

      <ToolNote className="mt-6">
        CLB levels are calculated from IRCC conversion tables. Rules and conversion tables may change.
        Last verified: August 2026. Official source:{" "}
        <a
          href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-requirements.html"
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
