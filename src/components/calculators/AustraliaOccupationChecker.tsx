"use client";

import { Briefcase, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ToolBadge, ToolCard, ToolNote, ToolSegmented } from "@/components/calculators/tool-kit";
import {
  AUSTRALIA_OCCUPATION_LAST_VERIFIED,
  AUSTRALIA_OCCUPATION_LIST_URL,
  SAMPLE_SKILLED_OCCUPATIONS,
} from "@/features/tools/australia-data";

const SKILL_TONES: Record<number, "pass" | "warn" | "neutral"> = {
  1: "pass",
  2: "warn",
  3: "neutral",
};

export function AustraliaOccupationChecker() {
  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState<string>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_SKILLED_OCCUPATIONS.filter((occ) => {
      if (skillFilter !== "all" && String(occ.skillLevel) !== skillFilter) return false;
      if (!q) return true;
      return (
        occ.title.toLowerCase().includes(q) ||
        occ.anzscoGroup.includes(q) ||
        occ.assessingAuthority.toLowerCase().includes(q)
      );
    });
  }, [query, skillFilter]);

  return (
    <ToolCard
      icon={Briefcase}
      eyebrow="Australia · ANZSCO discovery"
      title="Occupation & Eligibility Discovery"
      lede="Search a sample of common skilled occupations to see the ANZSCO group, skill level and typical skills-assessment authority for your role."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search occupation, ANZSCO group or authority…"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-ink shadow-sm transition placeholder:text-slate-400 hover:border-brand-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          />
        </div>
        <ToolSegmented
          value={skillFilter}
          onChange={setSkillFilter}
          options={[
            { value: "all", label: "All levels" },
            { value: "1", label: "Level 1" },
            { value: "2", label: "Level 2" },
            { value: "3", label: "Level 3" },
          ]}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          {results.length} occupation{results.length === 1 ? "" : "s"} shown
        </p>
      </div>

      <div className="mt-3 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-gradient-to-r from-brand-50 to-white text-[11px] uppercase tracking-[0.14em] text-slate-500">
              <tr>
                <th className="px-5 py-3.5 font-bold">Occupation</th>
                <th className="px-5 py-3.5 font-bold">ANZSCO group</th>
                <th className="px-5 py-3.5 font-bold">Skill level</th>
                <th className="hidden px-5 py-3.5 font-bold md:table-cell">Assessing authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {results.map((occ) => (
                <tr key={occ.title} className="transition-colors duration-150 hover:bg-brand-50/50">
                  <td className="px-5 py-4 font-semibold text-ink">{occ.title}</td>
                  <td className="px-5 py-4 tabular-nums text-slate-600">{occ.anzscoGroup}</td>
                  <td className="px-5 py-4">
                    <ToolBadge tone={SKILL_TONES[occ.skillLevel]}>Skill {occ.skillLevel}</ToolBadge>
                  </td>
                  <td className="hidden px-5 py-4 text-slate-600 md:table-cell">
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-brand-400" />
                      {occ.assessingAuthority}
                    </span>
                  </td>
                </tr>
              ))}
              {results.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center">
                    <p className="text-sm font-semibold text-slate-500">No occupations match “{query}”.</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Try a broader term — or check the official occupation list for the complete set.
                    </p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <ToolNote className="mt-6">
        Informational sample only — this curated list is not the full skilled-occupation list and being
        on it does not guarantee skills-assessment success or visa eligibility. Last verified:{" "}
        {AUSTRALIA_OCCUPATION_LAST_VERIFIED}. Official list:{" "}
        <a
          href={AUSTRALIA_OCCUPATION_LIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 underline underline-offset-2"
        >
          immi.homeaffairs.gov.au — skill occupation list
        </a>
      </ToolNote>
    </ToolCard>
  );
}
