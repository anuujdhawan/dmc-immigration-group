"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

import { ToolBadge, ToolCard, ToolNote, ToolResult, ToolSegmented } from "@/components/calculators/tool-kit";
import { matchPnpStreams, type PnpProvince } from "@/features/tools/canada-pnp";

interface Profile {
  inProvince: boolean;
  jobOffer: boolean;
  expressEntry: boolean;
}

export function PnpMatcher({ province }: { province: PnpProvince }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  const results = profile ? matchPnpStreams(province, profile) : [];

  const setAnswer = (key: keyof Profile, value: boolean) => {
    setProfile((prev) => ({
      ...(prev ?? { inProvince: false, jobOffer: false, expressEntry: false }),
      [key]: value,
    }));
  };

  return (
    <ToolCard
      icon={MapPin}
      eyebrow={`${province.name} · Provincial nominees`}
      title={`${province.abbreviation} Stream Matcher`}
      lede={`Answer three quick questions to see which ${province.name} nomination streams could fit your profile — and which ones need a job offer or an Express Entry profile.`}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-700">
            Are you currently living, working or studying in {province.name}?
          </p>
          <ToolSegmented
            value={profile?.inProvince === true ? "yes" : "no"}
            onChange={(value) => setAnswer("inProvince", value === "yes")}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-700">
            Do you have a qualifying job offer from an employer in {province.name}?
          </p>
          <ToolSegmented
            value={profile?.jobOffer === true ? "yes" : "no"}
            onChange={(value) => setAnswer("jobOffer", value === "yes")}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-700">
            Do you have an active federal Express Entry profile?
          </p>
          <ToolSegmented
            value={profile?.expressEntry === true ? "yes" : "no"}
            onChange={(value) => setAnswer("expressEntry", value === "yes")}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </div>
      </div>

      {profile ? (
        <div className="mt-7">
          <ToolResult
            tone={results.length > 0 ? "pass" : "warn"}
            status={
              results.length > 0
                ? `${results.length} stream${results.length === 1 ? "" : "s"} could fit your profile`
                : "No exact match right now"
            }
            score={results.length}
            scoreLabel="matching streams"
          >
            {results.length === 0 ? (
              <p className="text-sm leading-relaxed text-slate-600">
                No {province.abbreviation} stream matches this exact combination right now. Your profile
                may still be eligible after language, experience or an offer changes — book a free
                assessment to review it in detail.
              </p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {results.map((result) => (
                  <li
                    key={result.stream.name}
                    className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold leading-snug text-ink">{result.stream.name}</p>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                      {result.stream.description}
                    </p>
                    <div className="mt-3">
                      <ToolBadge tone={result.fit === "Likely fit" ? "pass" : result.fit === "Possible fit" ? "warn" : "neutral"}>
                        {result.fit}
                      </ToolBadge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ToolResult>
          <ToolNote className="mt-5">
            Informational estimate only — a match does not guarantee a nomination, and stream
            availability changes. Last verified: {province.lastVerified}. Official source:{" "}
            <a
              href={province.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 underline underline-offset-2"
            >
              {province.abbreviation}
            </a>
          </ToolNote>
        </div>
      ) : null}
    </ToolCard>
  );
}
