"use client";

import { useMemo, useState } from "react";

import {
  AUSTRALIA_OCCUPATION_LAST_VERIFIED,
  AUSTRALIA_OCCUPATION_LIST_URL,
  SAMPLE_SKILLED_OCCUPATIONS,
} from "@/features/tools/australia-data";

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="mb-1 font-display text-xl font-bold text-ink">Occupation &amp; eligibility discovery</h3>
      <p className="mb-6 text-sm text-slate-500">
        Search a sample of common skilled occupations to see the ANZSCO group, skill level and typical
        skills-assessment authority. This is an orientation tool — your exact ANZSCO code and the current
        skilled-occupation list must be confirmed on the official list.
      </p>

      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_220px]">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search occupation, ANZSCO group or authority…"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          <option value="all">All skill levels</option>
          <option value="1">Skill level 1</option>
          <option value="2">Skill level 2</option>
          <option value="3">Skill level 3</option>
        </select>
      </div>

      <p className="mb-3 text-xs text-slate-500">{results.length} occupation{results.length === 1 ? "" : "s"} shown</p>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Occupation</th>
              <th className="px-4 py-3 font-semibold">ANZSCO group</th>
              <th className="px-4 py-3 font-semibold">Skill level</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Assessing authority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((occ) => (
              <tr key={occ.title} className="bg-white transition hover:bg-brand-50/50">
                <td className="px-4 py-3 font-medium text-ink">{occ.title}</td>
                <td className="px-4 py-3 text-slate-600">{occ.anzscoGroup}</td>
                <td className="px-4 py-3 text-slate-600">Skill level {occ.skillLevel}</td>
                <td className="hidden px-4 py-3 text-slate-600 md:table-cell">{occ.assessingAuthority}</td>
              </tr>
            ))}
            {results.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">
                  No occupations match “{query}”. Try a broader term — or check the official occupation list
                  for the complete set.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-slate-500">
        Informational sample only — this curated list is not the full skilled-occupation list and being on it
        does not guarantee skills-assessment success or visa eligibility. Last verified:{" "}
        {AUSTRALIA_OCCUPATION_LAST_VERIFIED}. Official list:{" "}
        <a href={AUSTRALIA_OCCUPATION_LIST_URL} target="_blank" rel="noopener noreferrer" className="underline">
          immi.homeaffairs.gov.au — skill occupation list
        </a>
      </p>
    </div>
  );
}
