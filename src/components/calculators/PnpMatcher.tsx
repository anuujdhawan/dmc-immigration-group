"use client";

import { useState } from "react";

import { matchPnpStreams, type PnpProvince } from "@/features/tools/canada-pnp";

interface Profile {
  inProvince: boolean;
  jobOffer: boolean;
  expressEntry: boolean;
}

export function PnpMatcher({ province }: { province: PnpProvince }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  const results = profile ? matchPnpStreams(province, profile) : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h3 className="mb-1 font-display text-xl font-bold text-ink">
        {province.abbreviation} stream matcher
      </h3>
      <p className="mb-6 text-sm text-slate-500">
        Answer three quick questions to see which {province.name} nomination streams could fit your
        profile. Rules change — always confirm on the official program page.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Are you currently living, working or studying in {province.name}?
          </label>
          <div className="flex gap-2">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => setProfile((prev) => ({ ...(prev ?? { jobOffer: false, expressEntry: false }), inProvince: value }))}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  profile?.inProvince === value ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {value ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Do you have a qualifying job offer from an employer in {province.name}?
          </label>
          <div className="flex gap-2">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => setProfile((prev) => ({ ...(prev ?? { inProvince: false, expressEntry: false }), jobOffer: value }))}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  profile?.jobOffer === value ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {value ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Do you have an active federal Express Entry profile?
          </label>
          <div className="flex gap-2">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => setProfile((prev) => ({ ...(prev ?? { inProvince: false, jobOffer: false }), expressEntry: value }))}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  profile?.expressEntry === value ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {value ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {profile && (
        <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h4 className="mb-3 text-sm font-bold text-ink">Streams that could fit your profile</h4>
          {results.length === 0 ? (
            <p className="text-sm text-slate-600">
              No {province.abbreviation} stream matches this exact combination right now. Your profile may
              still be eligible after language, experience or an offer changes — book a free assessment to
              review it in detail.
            </p>
          ) : (
            <ul className="space-y-3">
              {results.map((result) => (
                <li key={result.stream.name} className="rounded-lg border border-brand-100 bg-white p-4">
                  <p className="text-sm font-bold text-ink">{result.stream.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{result.stream.description}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
                    {result.fit}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-slate-500">
            This is an informational estimate only — a match does not guarantee a nomination, and stream
            availability changes. Last verified: {province.lastVerified}. Official source:{" "}
            <a href={province.officialUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {province.abbreviation}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
